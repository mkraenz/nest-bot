function renderWeatherChart(weatherData) {
    var ctx = document.getElementById('weatherChart').getContext('2d');
    var options = {};
    weatherChartRef = new Chart(ctx, {
        type: 'line',
        data: weatherData,
        options: options,
    });
}

var chartConfig = {
    labels: [],
    datasets: [],
};

function getChartConfig(priceData, mvaMapAsArray) {
    chartConfig.labels = [...Array(priceData.length).keys()];
    chartConfig.datasets.push(getDataSetEntry('Prices', priceData, Color.Blue));
    mvaMapAsArray.forEach((periodsAndData, index) => {
        const periods = periodsAndData[0];
        const chartOffset = priceData.length - periodsAndData[1].length;
        const data = new Array(chartOffset).concat(periodsAndData[1]);
        chartConfig.datasets.push(
            getDataSetEntry(`mva(${periods})`, data, getColor(index)),
        );
    });
}

function getDataSetEntry(label, data, color) {
    return {
        label,
        data,
        fill: false,
        lineTension: 0.1,
        backgroundColor: color,
        borderColor: color,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: color,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        spanGaps: false,
    };
}

const Color = {
    Blue: 'rgba(75,192,192,1)',
    Red: 'rgba(255,0,0)',
    Gelb: 'rgba(0,255,0',
    Brown: '#893102',
    Violet: '#814395',
};

function getColor(index) {
    return Object.values(Color)[(index + 1) % Object.values(Color).length];
}

function roundToTwoDecimalPlaces(val) {
    return Math.round(val * 100) / 100;
}

async function main() {
    try {
        const host = 'http://localhost:3000';
        const response = await fetch(`${host}/prices`);
        const priceData = await response.json();
        const mvaResponse = await fetch(`${host}/moving-averages/all`);
        const mvaMapAsArray = await mvaResponse.json();
        getChartConfig(priceData, mvaMapAsArray);
        renderWeatherChart(chartConfig);
    } catch (error) {
        console.log(error);
    }
}

main();

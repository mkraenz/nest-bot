import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const DEFAULT_PERIODS = 10;

describe('MovingAverages (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/moving-averages/create POST -> 201', () => {
        return request(app.getHttpServer())
            .post('/moving-averages/create')
            .send({ periods: 123 })
            .expect(201);
    });

    it(`/moving-averages/by-periods/${DEFAULT_PERIODS} GET -> 200`, () => {
        return request(app.getHttpServer())
            .get(`/moving-averages/by-periods/${DEFAULT_PERIODS}`)
            .expect(200)
            .expect([]);
    });

    it('/moving-averages/ GET -> 302', () => {
        return request(app.getHttpServer())
            .get('/moving-averages')
            .expect(302);
    });

    it('/moving-averages/all GET -> 200', () => {
        return request(app.getHttpServer())
            .get('/moving-averages/all')
            .expect(200)
            .expect([[DEFAULT_PERIODS, []]]);
    });
});

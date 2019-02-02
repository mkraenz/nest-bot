export async function loggerMiddleware(req, res, next) {
    // tslint:disable-next-line:no-console
    console.log({
        reqUrl: req.originalUrl,
        reqBody: req.body,
    });
    next();
}

export function loggerMiddleware(req, res, next) {
    // tslint:disable-next-line:no-console
    console.log({ reqUrl: req.originalUrl, body: req.body });
    next();
}

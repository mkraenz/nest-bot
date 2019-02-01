export function loggerMiddleware(req, res, next) {
    // tslint:disable-next-line:no-console
    console.log({ reqUrl: req.url, body: req.body });
    next();
}

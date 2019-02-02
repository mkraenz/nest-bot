"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loggerMiddleware(req, res, next) {
    console.log(req);
    console.log({ reqUrl: req.originalUrl, body: req.body });
    next();
}
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map
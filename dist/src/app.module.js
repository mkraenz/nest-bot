"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = require("@nest-middlewares/cookie-parser");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cats_module_1 = require("./cats/cats.module");
const logger_middleware_1 = require("./logger.middleware");
const roles_guard_1 = require("./roles-guard/roles.guard");
const root_module_1 = require("./root/root.module");
let AppModule = class AppModule {
    configure(consumer) {
        const ALL = { path: '*', method: common_1.RequestMethod.ALL };
        consumer.apply(cookie_parser_1.CookieParserMiddleware).forRoutes(ALL);
        consumer.apply(logger_middleware_1.loggerMiddleware).forRoutes(ALL);
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [root_module_1.RootModule, cats_module_1.CatsModule],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';
import { CatsModule } from './cats/cats.module';
import { MockPricesModule } from './mock-prices/mock-prices.module';
import { RolesGuard } from './roles-guard/roles.guard';
import { RootModule } from './root/root.module';
import { UserModule } from './users/users.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        RootModule,
        CatsModule,
        BotModule,
        MockPricesModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {
    public configure(consumer: MiddlewareConsumer) {
        const ALL: RouteInfo = { path: '*', method: RequestMethod.ALL };
        consumer.apply(CookieParserMiddleware).forRoutes(ALL);
        this.applyCustomMorganMiddleWare();
        consumer
            .apply(MorganMiddleware)
            .exclude({ path: 'prices', method: RequestMethod.ALL })
            .forRoutes(ALL);
    }

    private applyCustomMorganMiddleWare() {
        MorganMiddleware.configure(
            ':method :url :status :res[content-length] - :response-time ms :body',
        );
        MorganMiddleware.token('body', (req, res) => {
            return JSON.stringify({ reqBody: req.body });
        });
    }
}

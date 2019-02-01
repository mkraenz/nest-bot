import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { loggerMiddleware } from './logger.middleware';

@Module({
    imports: [CatsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(loggerMiddleware);
    }
}

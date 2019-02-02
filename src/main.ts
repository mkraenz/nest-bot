import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { resolve } from 'path';
import { AppModule } from './app.module';

async function startServer() {
    const app = await NestFactory.create(AppModule);

    // TODO forbidUnknownValues not working https://github.com/typestack/class-validator/issues/305
    app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
    app.useStaticAssets(resolve('public'));

    await app.listen(3000);
}
startServer();

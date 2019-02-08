import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Bot (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/bot/prices GET -> 200', () => {
        return request(app.getHttpServer())
            .get('/bot/prices')
            .expect(200)
            .expect([]);
    });

    it('/bot/moving-averages GET -> 200', () => {
        return request(app.getHttpServer())
            .get('/bot/moving-averages')
            .expect(200)
            .expect([]);
    });

    it('/bot/set-moving-average-size/:size PUT -> 200', () => {
        return request(app.getHttpServer())
            .put('/bot/set-moving-average-size/1234')
            .expect(200)
            .expect(/successfully.*1234/i);
    });

    it('/bot/reset GET -> 200', () => {
        return request(app.getHttpServer())
            .get('/bot/reset')
            .expect(200)
            .expect('success');
    });

    it('bot/stop GET -> 200', () => {
        return request(app.getHttpServer())
            .get('/bot/stop')
            .expect(200)
            .expect('success');
    });
});

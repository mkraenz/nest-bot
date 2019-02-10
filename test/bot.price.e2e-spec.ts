import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Price (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/price GET -> 200', () => {
        return request(app.getHttpServer())
            .get('/price')
            .expect(200)
            .expect([]);
    });

    it('price/stop GET -> 200', () => {
        return request(app.getHttpServer())
            .get('/price/stop')
            .expect(200)
            .expect('success');
    });
});

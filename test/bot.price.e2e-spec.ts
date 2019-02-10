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

    it('/prices GET -> 200', () => {
        return request(app.getHttpServer())
            .get('/prices')
            .expect(200)
            .expect([]);
    });

    it('prices/stop GET -> 200', () => {
        return request(app.getHttpServer())
            .get('/prices/stop')
            .expect(200)
            .expect('success');
    });
});

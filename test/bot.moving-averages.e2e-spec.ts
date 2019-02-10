import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('MovingAverages (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/moving-averages/create POST -> 201', () => {
        return request(app.getHttpServer())
            .post('/moving-averages/create')
            .send({ key: 'my-test-key', periods: 123 })
            .expect(201);
    });

    it('/moving-averages/default GET -> 200', () => {
        return request(app.getHttpServer())
            .get('/moving-averages/default')
            .expect(200)
            .expect([]);
    });
});

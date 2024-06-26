// tests/userRoutes.test.js
const request = require('supertest');
const app = require('../app');

describe('User Routes', () => {
    test('GET /users/register', async () => {
        const response = await request(app).get('/users/register');
        expect(response.status).toBe(200);
    });

    test('POST /users/register', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({ name: 'test', age: 30, goals: 'gain muscle', password: 'password' });
        expect(response.status).toBe(302);
        expect(response.header.location).toMatch(/^\/users\/profile\/\d+$/);
    });

    test('GET /users/login', async () => {
        const response = await request(app).get('/users/login');
        expect(response.status).toBe(200);
    });

    test('POST /users/login', async () => {
        // Register user first
        await request(app)
            .post('/users/register')
            .send({ name: 'testlogin', age: 30, goals: 'lose weight', password: 'password' });

        const response = await request(app)
            .post('/users/login')
            .send({ name: 'testlogin', password: 'password' });
        expect(response.status).toBe(302);
        expect(response.header.location).toMatch(/^\/users\/profile\/\d+$/);
    });
});

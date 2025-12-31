const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);

let mongoServer;

beforeAll(async () => {
    // Setup in-memory database for testing
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Auth API', () => {
    let token;

    // Test 1: Register User
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('name', 'Test User');
    });

    // Test 2: Login User
    it('should login the user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; // Save token for next test
    });

    // Test 3: Get Current User (Protected Route)
    it('should get current user profile with valid token', async () => {
        const res = await request(app)
            .get('/api/auth/me')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toHaveProperty('email', 'test@example.com');
    });

    // Test 4: Fail Login with wrong password
    it('should not login with valid email but invalid password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(401);
    });

    // Test 5: Route Protection
    it('should return 401 for protected route without token', async () => {
        const res = await request(app)
            .get('/api/auth/me'); // No token

        expect(res.statusCode).toEqual(401);
    });
});

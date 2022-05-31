import mongoose from 'mongoose';
import request from 'supertest';
import { app, server } from '../src/app.js';
import { jest } from '@jest/globals';

jest.useFakeTimers();

const api = request(app);

describe('Index', () => {
  test('should respond with a 200 status code', async () => {
    const response = await api.get('/').send();
    expect(response.status).toBe(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});

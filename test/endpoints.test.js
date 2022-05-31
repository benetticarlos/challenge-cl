import mongoose from 'mongoose';
import request from 'supertest';
import { app, server } from '../src/app.js';
import { jest } from '@jest/globals';

jest.useFakeTimers();
const api = request(app);

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
describe('Endpoints renders', () => {
  // /users
  test('GET /signIn', async () => {
    const response = await api.get('/users/signIn');
    const statusCode =
      response.status === 200 ? true : response.status === 302 ? true : false;
    expect(statusCode).toBe(true);
  });

  test('POST /signUp', async () => {
    const response = await api.post('/users/signUp').send({
      name: 'test',
      email: 'email@test.com',
      password: '123456',
      confirmPassword: '123456',
    });
    const statusCode =
      response.status === 200 ? true : response.status === 302 ? true : false;
    expect(statusCode).toBe(true);
  });

  test('GET /logout', async () => {
    const response = await api.get('/users/logout');
    const statusCode =
      response.status === 200 ? true : response.status === 302 ? true : false;
    expect(statusCode).toBe(true);
  });

  test('GET /profile', async () => {
    const response = await api.get('/users/profile');
    const statusCode =
      response.status === 200 ? true : response.status === 302 ? true : false;
    expect(statusCode).toBe(true);
  });

  // publications

  test('GET /publications', async () => {
    const response = await api.get('/publications');
    const statusCode =
      response.status === 200 ? true : response.status === 302 ? true : false;
    expect(statusCode).toBe(true);
  });

  // notifications

  test('GET /notifications', async () => {
    const response = await api.get('/notifications');
    const statusCode =
      response.status === 200 ? true : response.status === 302 ? true : false;
    expect(statusCode).toBe(true);
  });
});

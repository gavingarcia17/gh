const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../server'); // Adjust the path as necessary

beforeAll(async () => {
  console.log('Connecting to MongoDB...');
  await mongoose.connect('mongodb://localhost/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
}, 30000); // Increase timeout to 30 seconds

afterAll(async () => {
  console.log('Closing MongoDB connection...');
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  server.close();
}, 30000); // Increase timeout to 30 seconds

describe('GET /api/users', () => {
  it('should return all users', async () => {
    console.log('Sending GET request to /api/users');
    const res = await request(app).get('/api/users');
    console.log('Received response from /api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  }, 30000); // Increase timeout to 30 seconds
});
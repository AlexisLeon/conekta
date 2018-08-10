const request = require('supertest');
const app = require('../../server');
const config = require('../config');

let headers;
let endpoint;
let body;

describe('Refresh access token', () => {
  beforeAll(() => {
    endpoint = '/oauth/token';
  });

  beforeEach(() => {
    headers = {
      Authorization: config.credentials.basicAuth,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    body = {
      grant_type: 'refresh_token',
      refresh_token: process.env.TEST_REFRESH_TOKEN,
    };
  });

  test('Should return access token for valid refresh token', done =>
    request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('access_token');
        expect(res.body).toHaveProperty('refresh_token');
        expect(res.body).toHaveProperty('expires_in');
        expect(res.body).toHaveProperty('scope');

        global.TEST_ACCESS_TOKEN = res.body.access_token;
        global.TEST_REFRESH_TOKEN = res.body.refresh_token;

        done();
      }));

  test('Should return error when refresh token is wrong', () => {
    body.refresh_token = 'A0123456-A012-A012-A012-A01234567890';

    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(403)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });

  test('Should return error when refresh token is invalid', () => {
    body.refresh_token = '0123456789';

    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });

  test('Should return error when refresh token is empty', () => {
    body.refresh_token = '';

    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });

  test('Should return error when refresh token is missing', () => {
    delete body.refresh_token;

    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(400)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });
});

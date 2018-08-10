const request = require('supertest');
const app = require('../../server');
const config = require('../config');

let headers;
let endpoint;
let body;

describe('Get access token', () => {
  beforeAll(() => {
    endpoint = '/oauth/token';
  });

  beforeEach(() => {
    headers = {
      Authorization: config.credentials.basicAuth,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    body = {
      grant_type: 'password',
      username: config.credentials.username,
      password: config.credentials.password,
    };
  });

  test('Should return access token for authorized user', done =>
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

  test('Should return error when username is wrong', () => {
    body.username = 'tests@conekta.mx';

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

  test('Should return error when password is wrong', () => {
    body.password = 'passwd';

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

  test('Should return error when username is invalid email', () => {
    body.username = 'tests';

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

  test('Should return error when username is invalid phone', () => {
    body.username = '1234';

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

  test('Should return error when username is empty', () => {
    body.username = '';

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

  test('Should return error when password is empty', () => {
    body.password = '';

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

  test('Should return error when username is missing', () => {
    delete body.username;

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

  test('Should return error when password is missing', () => {
    delete body.password;

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

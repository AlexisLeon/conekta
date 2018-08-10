const request = require('supertest');
const app = require('../../server');
const config = require('../config');

let headers;
let endpoint;
let body;
const initialBody = {
  email: config.credentials.username,
  password: config.credentials.password,
  firstName: config.customer.firstName,
  lastName: config.customer.lastName,
};

describe('Register new user', () => {
  beforeAll(() => {
    endpoint = '/register';
  });

  beforeEach(() => {
    headers = {
      'Content-Type': 'application/json',
    };

    body = initialBody;
  });

  test('Should create a new user', () => request(app)
    .post(endpoint)
    .set(headers)
    .send(body)
    .expect(200)
    .then((res) => {
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('email');
      expect(res.body).toHaveProperty('firstName');
      expect(res.body).toHaveProperty('lastName');
    }));

  test('Should return error when user already exists', () => {
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

  describe('Should return error when fields are invalid', () => {
    const testCases = [
      { description: 'email elements', before: () => { body.email = 'abc'; } },
      { description: 'email is not a string', before: () => { body.email = 123; } },
      { description: 'firstName is not a string', before: () => { body.firstName = 123; } },
      { description: 'lastName is not a string', before: () => { body.lastName = 123; } },
    ];

    testCases.forEach((testCase) => {
      test(testCase.description, () => {
        body = initialBody;
        testCase.before();

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
  });

  describe('Should return error when fields are empty', () => {
    const testCases = [
      { description: 'email is empty', before: () => { body.email = null; } },
      { description: 'password is empty', before: () => { body.password = null; } },
      { description: 'firstName is empty', before: () => { body.firstName = null; } },
      { description: 'lastName is empty', before: () => { body.lastName = null; } },
    ];

    testCases.forEach((testCase) => {
      test(testCase.description, () => {
        body = initialBody;
        testCase.before();

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
  });

  describe('Should return error when fields are missing', () => {
    const testCases = [
      { description: 'email is empty', before: () => { delete body.email; } },
      { description: 'password is empty', before: () => { delete body.password; } },
      { description: 'firstName is empty', before: () => { delete body.firstName; } },
      { description: 'lastName is empty', before: () => { delete body.lastName; } },
    ];

    testCases.forEach((testCase) => {
      test(testCase.description, () => {
        body = initialBody;
        testCase.before();

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
  });
});

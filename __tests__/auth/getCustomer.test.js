const request = require('supertest');
const app = require('../../server');

let headers;
let endpoint;
let body;

describe('Get authenticated customer', () => {
  beforeAll(() => {
    endpoint = '/v1/me';
  });

  beforeEach(() => {
    headers = {
      Authorization: process.env.TEST_ACCESS_TOKEN,
    };
  });

  test('Should return customer', done =>
    request(app)
      .get(endpoint)
      .set(headers)
      .send(body)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('firstName');
        expect(res.body).toHaveProperty('lastName');

        done();
      }));

  test('Should return error when no authentication given', () => {
    delete headers.Authorization;

    return request(app)
      .post(endpoint)
      .set(headers)
      .send(body)
      .expect(401)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'authentication_error');
      });
  });
});

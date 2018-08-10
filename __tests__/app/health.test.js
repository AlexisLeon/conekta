const request = require('supertest');
const app = require('../../server');

describe('Test server health', () => {
  test('Should return health data', () => {
    return request(app)
      .get('/health')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });

  test('Should return db status', () => {
    return request(app)
      .get('/health')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('db');
        expect(typeof res.body.db).toBe('boolean');
      });
  });

  test('Database should be connected', () => {
    return request(app)
      .get('/health')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('db');
        expect(res.body.db).toBe(true);
      });
  });
});

const request = require('supertest');
const app = require('./../server');
const config = require('./config');

beforeAll((done) => {
  request(app)
    .post('/oauth/token')
    .set({
      Authorization: config.credentials.basicAuth,
      'Content-Type': 'application/x-www-form-urlencoded',
    })
    .send({
      grant_type: 'password',
      username: config.credentials.username,
      password: config.credentials.password,
    })
    .then((res) => {
      global.TEST_ACCESS_TOKEN = res.body.access_token;
      global.TEST_REFRESH_TOKEN = res.body.refresh_token;
      done();
    });
});

beforeEach((done) => {
  process.env.TEST_ACCESS_TOKEN = `Bearer ${global.TEST_ACCESS_TOKEN}`;
  process.env.TEST_REFRESH_TOKEN = global.TEST_REFRESH_TOKEN;
  done();
});

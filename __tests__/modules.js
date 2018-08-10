const config = require('./config');
const app = require('../server');
const request = require('supertest');

const jsonHeaders = { 'Content-Type': 'application/json' };
// const bearerAuthHeaders = () => ({ Authorization: process.env.TEST_ACCESS_TOKEN });
const bearerAuthHeaders = () => {
  console.log('MY AUTH IS', process.env.TEST_ACCESS_TOKEN);
  return { Authorization: process.env.TEST_ACCESS_TOKEN };
};

function register(endpoint = '/register', headers = {}) {
  return body => request(app)
    .post(endpoint)
    .set({ ...jsonHeaders, headers })
    .send(body);
}

const createNewCardBody = {
  number: '4242424242424242',
  expirationMonth: '01',
  expirationYear: '21',
  cvc: '123',
  holderName: `${config.customer.firstName} ${config.customer.lastName}`,
};

function createNewCard(endpoint = '/v1/cards', headers = {}) {
  return body => request(app)
    .post(endpoint)
    .set({ ...jsonHeaders, ...bearerAuthHeaders(), headers })
    .send(body);
}

function getCards(endpoint = '/v1/cards', headers = {}) {
  return () => request(app)
    .get(endpoint)
    .set({ ...bearerAuthHeaders(), headers });
}

function getSingleCard(endpoint = '/v1/cards', headers = {}) {
  return () => request(app)
    .get(endpoint)
    .set({ ...bearerAuthHeaders(), headers });
}

module.exports = {
  register,
  createNewCard: {
    request: createNewCard,
    body: createNewCardBody,
  },
  getCards: {
    request: getCards,
  },
  getSingleCard: {
    request: getSingleCard,
  },
};

const { request: createNewCardRequest, body: cardBody } = require('../modules').createNewCard;
const { request: getSingleCard } = require('../modules').getSingleCard;

let cardId;

const getEndpoint = id => `/v1/cards/${id}`;

describe('Get single card', () => {
  beforeAll(() => {
    const createNewCard = createNewCardRequest();
    return createNewCard(cardBody)
      .then((res) => {
        cardId = res.body.id;
      });
  });

  test('Should return single card', () => getSingleCard(getEndpoint(cardId))
    .expect(200)
    .then((res) => {
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('type');
      expect(res.body).toHaveProperty('expirationMonth');
      expect(res.body).toHaveProperty('expirationYear');
      expect(res.body).toHaveProperty('holderName');

      expect(res.body).toHaveProperty('number');
      expect(res.body.number.length).toBe(4);
    }));

  test('Should return error when cardId is invalid', () => {
    cardId = '01234567890';

    return getSingleCard(getEndpoint(cardId))
      .expect(400)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });

  test('Should return error when card does not exist', () => {
    cardId = 'A0123456-A012-A012-A012-A01234567890';

    return getSingleCard(getEndpoint(cardId))
      .expect(400)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('error');
        expect(res.body).toHaveProperty('error.type', 'invalid_request_error');
      });
  });
});

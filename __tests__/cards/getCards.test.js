const { request: createNewCardRequest, body: cardBody } = require('../modules').createNewCard;
const { request: getCardsRequest } = require('../modules').getCards;

const getCards = getCardsRequest();

describe('Get cards', () => {
  beforeAll(() => {
    const createNewCard = createNewCardRequest();
    return createNewCard(cardBody);
  });

  test('Should return cards', () => getCards()
    .expect(200)
    .then((res) => {
      expect(res.body).toBeInstanceOf(Array);
      res.body.forEach((card) => {
        expect(card).toBeInstanceOf(Object);
        expect(card).toHaveProperty('id');
        expect(card).toHaveProperty('type');
        expect(card).toHaveProperty('expirationMonth');
        expect(card).toHaveProperty('expirationYear');
        expect(card).toHaveProperty('holderName');

        expect(card).toHaveProperty('number');
        expect(card.number.length).toBe(4);
      });
    }));
});

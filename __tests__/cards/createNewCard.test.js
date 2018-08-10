const { request, body: reqBody } = require('../modules').createNewCard;

let body;
let createNewCard;

describe('Create new card', () => {
  beforeEach(() => {
    body = reqBody;
    createNewCard = request();
  });

  test('Should create a new card', () => createNewCard(body)
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

  describe('Should return error when fields are invalid', () => {
    const testCases = [
      { description: 'number is not a string', before: () => { body.number = 123; } },
      { description: 'number invalid', before: () => { body.number = '0000AAAA1111BBBB'; } },
      { description: 'expirationMonth is not a string', before: () => { body.expirationMonth = 1; } },
      { description: 'expirationMonth invalid', before: () => { body.expirationMonth = '13'; } },
      { description: 'expirationYear is not a string', before: () => { body.expirationYear = 21; } },
      { description: 'expirationYear invalid', before: () => { body.expirationYear = '17'; } },
      { description: 'cvc is not a string', before: () => { body.expirationYear = 123; } },
      { description: 'cvc invalid < 3 digits', before: () => { body.expirationYear = '12'; } },
      { description: 'cvc invalid > 4 digits', before: () => { body.expirationYear = '12345'; } },
      { description: 'holderName is not a string', before: () => { body.holderName = false; } },
    ];

    testCases.forEach((testCase) => {
      test(testCase.description, () => {
        body = reqBody;
        testCase.before();

        return createNewCard(body)
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
      { description: 'number is empty', before: () => { body.number = null; } },
      { description: 'expirationMonth is empty', before: () => { body.expirationMonth = null; } },
      { description: 'expirationYear is empty', before: () => { body.expirationYear = null; } },
      { description: 'cvc is empty', before: () => { body.cvc = null; } },
      { description: 'holderName is empty', before: () => { body.holderName = null; } },
    ];

    testCases.forEach((testCase) => {
      test(testCase.description, () => {
        body = reqBody;
        testCase.before();

        return createNewCard(body)
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
      { description: 'number is empty', before: () => { delete body.email; } },
      { description: 'expirationMonth is empty', before: () => { delete body.password; } },
      { description: 'expirationYear is empty', before: () => { delete body.firstName; } },
      { description: 'cvc is empty', before: () => { delete body.lastName; } },
    ];

    testCases.forEach((testCase) => {
      test(testCase.description, () => {
        body = reqBody;
        testCase.before();

        return createNewCard(body)
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

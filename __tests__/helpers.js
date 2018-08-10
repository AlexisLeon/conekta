module.exports = {
  /**
   * Validate invalid fields
   * @param testCases {Array<Object>}
   * @param testCases[].description {String}
   * @param testCases[].before {Function}
   * @param request {Function}
   */
  validateInvalidFields: function (testCases, request) {
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
  },
};

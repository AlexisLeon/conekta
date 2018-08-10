const router = require('express').Router();
const validator = require('../controllers/middleware/validation');
const customer = require('../controllers/customer');
const cards = require('../controllers/cards');
// const balance = require('../controllers/balance');
// const transactions = require('../controllers/transactions');
// const topUps = require('../controllers/topUps');
// const transfers = require('../controllers/transfers');
// const withdraws = require('../controllers/withdraws');

router.get('/me', customer.getCustomer);

router.post('/cards', cards.validator.createNewCard, validator.validate, cards.createNewCard);
router.get('/cards', cards.getCards);
router.get('/cards/:card_id', cards.getSingleCard);

// router.get('/balance', balance.getBalance);
// router.get('/transactions', transactions.getTransactions);
// router.post('/top-up', topUps.validator.topUp, topUps.topUp);
// router.post('/transfer', transfers.validator.transfer, transfers.transfer);
// router.post('/withdraw', withdraws.validator.withdraw, withdraws.withdraw);

module.exports = router;

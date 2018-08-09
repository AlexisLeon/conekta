const router = require('express').Router();
const customer = require('../controllers/customer');
// const balance = require('../controllers/balance');
// const transactions = require('../controllers/transactions');
// const topUps = require('../controllers/topUps');
// const transfers = require('../controllers/transfers');
// const withdraws = require('../controllers/withdraws');

router.get('/me', customer.getCustomer);
// router.get('/balance', balance.getBalance);
// router.get('/transactions', transactions.getTransactions);
// router.post('/top-up', topUps.validator.topUp, topUps.topUp);
// router.post('/transfer', transfers.validator.transfer, transfers.transfer);
// router.post('/withdraw', withdraws.validator.withdraw, withdraws.withdraw);

module.exports = router;

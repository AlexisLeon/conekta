const router = require('express').Router();
const validator = require('../controllers/middleware/validation');

const health = require('../controllers/health');
const register = require('../controllers/register');

/* HEALTH */
router.get('/health', health.checkHealth);

/* SIGN UP */
router.post('/register', register.validator.register, validator.validate, register.register);

module.exports = router;

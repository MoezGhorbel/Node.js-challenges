const express = require('express');
const controllers = require('../controllers/registrer');
const router = express.Router();

router.post('/register', controllers.register);
router.post('/login', controllers.login);

module.exports = router;
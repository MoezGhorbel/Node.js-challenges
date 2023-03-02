const express = require('express');
const router = express.Router();
const sendMail = require('../controllers/email');

router.get('/', sendMail.sendemail);
router.get('/html', sendMail.sendemailhtml);

module.exports = router;
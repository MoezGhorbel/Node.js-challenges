const express = require('express');
const router = express.Router();
const sendMail = require('../controllers/email');

router.get('/', passport.authenticate('bearer', { session: false }), sendMail.sendemail);
router.get('/html', passport.authenticate('bearer', { session: false }), sendMail.sendemailhtml);

module.exports = router;
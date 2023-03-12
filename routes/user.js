const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/create', passport.authenticate('bearer', { session: false }), userController.createUser);
router.get('/:id', passport.authenticate('bearer', { session: false }), userController.getUser);
router.get('/', passport.authenticate('bearer', { session: false }), userController.getAllUsers);
router.put('/update/:id', passport.authenticate('bearer', { session: false }), userController.updateUser);
router.delete('/delete/:id', passport.authenticate('bearer', { session: false }), userController.deleteUser);
router.put('/affect/:userId/:todoId', passport.authenticate('bearer', { session: false }), userController.affect);
router.put('/unaffected/:userId/:todoId', passport.authenticate('bearer', { session: false }), userController.unaffected);

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/create', userController.createUser);
router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.put('/affect/:userId/:todoId', userController.affect);
router.put('/unaffected/:userId/:todoId', userController.unaffected);

module.exports = router;

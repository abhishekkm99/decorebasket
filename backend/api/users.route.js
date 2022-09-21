const express = require('express');
const router = express.Router();
const userCrtl = require('../controllers/user.contoller');

router.get('/', userCrtl.getUsers);
router.get('/:id', userCrtl.getUser);
router.post('/', userCrtl.createUser);
router.post('/register', userCrtl.registerUser);
router.post('/login', userCrtl.loginUser);
router.put('/:id', userCrtl.updateUser);
router.delete('/:id', userCrtl.deleteUser);
router.get('/get/count', userCrtl.getUserCount);

module.exports = router;
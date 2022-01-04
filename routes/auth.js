var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/AuthController');
const {isAuth, verifyToken} = require('../utils/isAuth');
const {signupValidation, loginValidation, validate} = require('../utils/Validator');
const jwt = require('jsonwebtoken');

router.post('/api/register', signupValidation(), validate, AuthController.register);
router.post('/api/login', loginValidation(), validate,AuthController.Login);
router.post('/api/logout', AuthController.logout);


module.exports = router;
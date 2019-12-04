const express = require('express');
const passport = require('passport');

const userController = require('./user.controller');

const userRouter = express.Router();
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/me',
               passport.authenticate('jwt', { session: false }),
               userController.me);

module.exports = userRouter;
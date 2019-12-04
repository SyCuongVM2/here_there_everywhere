const express = require('express');
const passport = require('passport');

const profileController = require('./profile.controller');
const authentication = passport.authenticate('jwt', { session: false });

const profileRouter = express.Router();
profileRouter.route('/').get(authentication, profileController.current)
                        .post(authentication, profileController.create)
                        .delete(authentication, profileController.delete);
profileRouter.route('/user/:user_id').get(profileController.getById);

module.exports = profileRouter;
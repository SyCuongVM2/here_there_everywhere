const express = require('express');
const passport = require('passport');

const categoryController = require('./category.controller');
const authentication = passport.authenticate('jwt', { session: false });

const categoryRouter = express.Router();
categoryRouter.route('/').post(categoryController.add)
                         .get(categoryController.getAllParent);
categoryRouter.route('/:id').get(categoryController.getById)
                            .delete(authentication, categoryController.delete);
categoryRouter.route('/sub/categories/:id').get(categoryController.getAllChildren);

module.exports = categoryRouter;
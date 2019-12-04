const express = require('express');

const userRouter = require('./resources/user');
const profileRouter = require('./resources/profile');
const categoryRouter = require('./resources/category');
const articleRouter = require('./resources/article');
const commentRouter = require('./resources/comment');

const restAPIRouter = express.Router();
restAPIRouter.use('/user', userRouter);
restAPIRouter.use('/profile', profileRouter);
restAPIRouter.use('/categories', categoryRouter);
restAPIRouter.use('/articles', articleRouter);
restAPIRouter.use('/comments', commentRouter);

module.exports = restAPIRouter;
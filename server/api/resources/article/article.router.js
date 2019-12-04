const express = require('express');

const articleController = require('./article.controller');

const articleRouter = express.Router();
articleRouter.route('/:id').get(articleController.getById);
articleRouter.route('/page/:page').get(articleController.getAll);
articleRouter.route('/:cate_code/page/:page').get(articleController.getByCategory);
articleRouter.route('/search/:page/:search_query').get(articleController.searchArticles);

module.exports = articleRouter;
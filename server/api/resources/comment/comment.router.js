const express = require('express');
const passport = require('passport');

const commentController = require('./comment.controller');
const authentication = passport.authenticate('jwt', { session: false });

const commentRouter = express.Router();
commentRouter.route('/:article_id').post(authentication, commentController.addComment)
commentRouter.route('/all/:article_id/:type').get(commentController.getAll);
                                   
commentRouter.route('/comment/:comment_id').get(authentication, commentController.getComment);
commentRouter.route('/comment/:comment_id/reply/:reply_id').get(authentication, commentController.getReply);

commentRouter.route('/total/:article_id').get(commentController.getTotalComments);

commentRouter.route('/likes/:comment_id').post(authentication, commentController.likeComment);
commentRouter.route('/unlikes/:comment_id').post(authentication, commentController.unlikeComment);

commentRouter.route('/replies/:comment_id').post(authentication, commentController.addReply);
commentRouter.route('/:comment_id/replies/:reply_id').delete(authentication, commentController.deleteReply);

commentRouter.route('/:comment_id/replies/likes/:reply_id').post(authentication, commentController.likeReply);
commentRouter.route('/:comment_id/replies/unlikes/:reply_id').post(authentication, commentController.unlikeReply);

module.exports = commentRouter;
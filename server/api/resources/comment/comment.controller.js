const Comment = require('./comment.model');
const User = require('../user/user.model');
const Article = require('../article/article.model');

module.exports = {
  // @route  POST api/comments/comment/:comment_id
  // @desc   POST add new comment
  // @access Private
  getComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.comment_id);
      if (comment) {
        return res.json(comment);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  POST api/comments/comment/:comment_id/reply/:reply_id
  // @desc   POST add new comment
  // @access Private
  getReply: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.comment_id);
      if (comment) {
        const getIndex = comment.replies.map(reply => reply._id.toString()).indexOf(req.params.reply_id);
        return res.json(comment.replies[getIndex]);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  GET api/comments/:article_id
  // @desc   GET comments route
  // @access Public
  getAll: async(req, res) => {
    try {
      let comments;
      const type = req.params.type;
      if (type == "likes") {
        comments = await Comment.find({ article: req.params.article_id }).sort({ likes: -1 });
      } else {
        comments = await Comment.find({ article: req.params.article_id }).sort({ date_created: -1 });
      }
      if (comments) {
        return res.json(comments);
      } 
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  GET api/comments/total/:article_id
  // @desc   GET comments route
  // @access Public
  getTotalComments: async(req, res) => {
    try {
      let count = 0;
      const comments = await Comment.find({ article: req.params.article_id });
      if (comments) {
        count = count + comments.length;
        comments.map(comment => {
          count = count + comment.replies.length;
        });
        
        return res.json(count);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
    // @route  POST api/comments/:article_id
  // @desc   POST add new comment
  // @access Private
  addComment: async(req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      const article = await Article.findById(req.params.article_id);
      if (article) {
        const newComment = new Comment({
          article: req.params.article_id,
          user: user.id,
          name: user.name,
          text: req.body.text,
          avatar: user.avatar
        });
        const addedComment = await newComment.save();
        if (addedComment) {
          return res.json(addedComment);
        }
      }
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  POST api/comments/likes/:comment_id
  // @desc   POST comments route
  // @access Private
  likeComment: async(req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        const comment = await Comment.findById(req.params.comment_id);
        if (comment) {
          if (comment.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(404).json({ alreadyliked: "AlreadyLiked!" });
          }
          comment.likes.unshift({ user: req.user.id });
          const likeComment = await comment.save();
          if (likeComment) {
            return res.json(likeComment);
          }
        }
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // @route  POST api/comments/unlikes/:comment_id
  // @desc   POST comments route
  // @access Private
  unlikeComment: async(req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        const comment = await Comment.findById(req.params.comment_id);
        if (comment) {
          if (comment.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(404).json({ notlikedyet: "NotLikedYet!" });
          }

          const removeIndex = comment.likes.map(like => like.user.toString()).indexOf(req.user.id);
          comment.likes.splice(removeIndex, 1);
          const unlikeComment = await comment.save();
          if (unlikeComment) {
            return res.json(unlikeComment);
          }
        }
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // @route  POST api/comments/replies/:comment_id
  // @desc   POST comments route
  // @access Private
  addReply: async(req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      const comment = await Comment.findById(req.params.comment_id);
      if (comment) {
        const newReply = {
          user: req.user.id,
          name: user.name,
          text: req.body.text,
          avatar: user.avatar
        };
        comment.replies.unshift(newReply);
        const replyComment = await comment.save();
        if (replyComment) {
          return res.json(replyComment);
        }
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // @route  DELETE api/comments/:comment_id/replies/:reply_id
  // @desc   DELETE comments route
  // @access Private
  deleteReply: async(req, res) => {
    try {
      const comment = await Comment.findById(req.params.comment_id);
      if (comment) {
        const removeIndex = comment.replies.map(reply => reply._id.toString()).indexOf(req.params.reply_id);
        // remove from array
        comment.replies.splice(removeIndex, 1);
        const replyComment = await comment.save();
        if (replyComment) {
          return res.json(replyComment);
        }
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // @route  POST api/comments/:comment_id/replies/likes/:reply_id
  // @desc   POST comments route
  // @access Private
  likeReply: async(req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        const comment = await Comment.findById(req.params.comment_id);
        if (comment) {
          const likesIndex = comment.replies.map(reply => reply._id.toString()).indexOf(req.params.reply_id);

          if (comment.replies[likesIndex].likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(404).json({ alreadyliked: "AlreadyLiked!" });
          }

          comment.replies[likesIndex].likes.unshift({ user: req.user.id });
          const likeReply = await comment.save();
          if (likeReply) {
            return res.json(likeReply);
          }
        }
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // @route  POST api/comments/:comment_id/replies/unlikes/:reply_id
  // @desc   POST comments route
  // @access Private
  unlikeReply: async(req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        const comment = await Comment.findById(req.params.comment_id);
        if (comment) {
          const unlikesIndex = comment.replies.map(reply => reply._id.toString()).indexOf(req.params.reply_id);

          if (comment.replies[unlikesIndex].likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(404).json({ notlikedyet: "NotLikedYet!" });
          }

          const removeIndex = comment.replies[unlikesIndex].likes.map(like => like.user.toString()).indexOf(req.user.id);
          comment.replies[unlikesIndex].likes.splice(removeIndex, 1);
          const unlikeReply = await comment.save();
          if (unlikeReply) {
            return res.json(unlikeReply);
          }
        }
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
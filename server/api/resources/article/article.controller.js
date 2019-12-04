const Article = require('./article.model');
const Category = require('../category/category.model');
const User = require('../user/user.model');
const articleService = require('./article.service');

module.exports = {
  // @route  GET api/articles/:id
  // @desc   GET article route
  // @access Public
  getById: async(req, res) => {
    try {
      const article = await Article.findById(req.params.id)
                                   .populate('category', ['en_name', 'vn_name'], Category);
      if (article) {
        return res.json(article);
      } 
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
    // @route  GET api/articles/page/:page
  // @desc   GET article route
  // @access Public
  getAll: async(req, res) => {
    try {
      const { page } = req.params;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: 10,
        populate: {
          path: 'category',
          select: 'en_name vn_name',
        },
        sort: { date_created: -1 }
      };

      const articles = await Article.paginate({}, options)            
      if (articles) {
        return res.json(articles);
      } 
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  GET api/articles/:cate_code/page/:page
  // @desc   GET article route
  // @access Public
  getByCategory: async(req, res) => {
    try {
      const { page } = req.params;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: 10,
        populate: {
          path: 'category',
          select: 'en_name vn_name',
        },
        sort: { date_created: -1 }
      };

      const category = await Category.findOne({ cate_code: req.params.cate_code });
      if (category) {
        const articles = await Article.paginate({ category: category._id }, options);
        if (articles) {
          return res.json(articles);
        } 
      }
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  GET api/articles/search/:search_query
  // @desc   GET article route
  // @access Public
  searchArticles: async(req, res) => {
    try {
      // var re = new RegExp(req.params.search, 'i');
      // app.User.find().or([{ 'firstName': { $regex: re }}, { 'lastName': { $regex: re }}]).sort('title', 1).exec(function(err, users) {
      //     res.json(JSON.stringify(users));
      // });

      const { page } = req.params;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: 10,
        populate: {
          path: 'category',
          select: 'en_name vn_name',
        },
        sort: { date_created: -1 }
      };

      let searchQuery = "Du lịch";
      // searchQuery = '\"' + searchQuery.split(' ').join('\" \"') + '\"';
      searchQuery = searchQuery.split(' ').join('%20');

      const articles = await Article.paginate({ $text: { $search: searchQuery } }, options);
      if (articles) {
        return res.json(articles);
      } 
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  POST api/articles/likes/:id
  // @desc   POST article route
  // @access Private
  likeArticle: async(req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        const article = await Article.findById(req.params.id);
        if (article) {
          if (article.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(404).json({ alreadyliked: "AlreadyLiked!" });
          }
          article.likes.unshift({ user: req.user.id });
          const likeArticle = await article.save();
          if (likeArticle) {
            return res.json(likeArticle);
          }
        } 
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // @route  POST api/articles/unlikes/:id
  // @desc   POST article route
  // @access Private
  unlikeArticle: async(req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (user) {
        const article = await Article.findById(req.params.id);
        if (article) {
          if (article.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(404).json({ alreadyliked: "NotLikedYet!" });
          }
          // Add user id to likes
          const removeIndex = article.likes.map(like => like.user.toString()).indexOf(req.user.id);
          article.likes.splice(removeIndex, 1);
          const unlikeArticle = await article.save();
          if (unlikeArticle) {
            return res.json(unlikeArticle);
          }
        }
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};
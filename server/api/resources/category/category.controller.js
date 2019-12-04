const Category = require('./category.model');
const categoryService = require('./category.service');

module.exports = {
  // @route  POST api/categories
  // @desc   POST add new category
  // @access Private
  add: async(req, res) => {
    try {
      const { errors, isValid } = categoryService.validateCategory(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const existed = await Category.find({ cate_code: req.body.cate_code, en_name: req.body.en_name });
      if (existed) {
        errors.existed = "Category already existed";
        return res.status(400).json(errors);
      }

      let ordered;
      const categories = await Category.find();
      if (categories) {
        ordered = categories.length + 1;
      } else {
        ordered = 1;
      }

      const newCategory = new Category({
        cate_code: req.body.cate_code,
        en_name: req.body.en_name,
        vn_name: req.body.vn_name,
        parent: req.body.parent_id,
        ordered: ordered
      });
      const addedCategory = await newCategory.save();
      if (addedCategory) {
        return res.json(addedCategory);
      }
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  GET api/categories
  // @desc   GET all parent categories
  // @access Public
  getAllParent: async(req, res) => {
    try {
      const categories = await Category.find({ parent: { $eq: null } }).sort({ ordered: 1 });
      if (categories) {
        return res.json(categories);
      } 
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  GET api/sub/categories/:id
  // @desc   GET all parent categories
  // @access Public
  getAllChildren: async(req, res) => {
    try {
      const subCategory = await Category.find({ parent: req.params.id }).sort({ ordered: 1 });
      if (subCategory) {
        return res.json(subCategory);
      } 
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  GET api/categories/:id
  // @desc   GET category route
  // @access Public
  getById: async(req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category) {
        return res.json(category);
      } 
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  },
  // @route  DELETE api/categories/:id
  // @desc   DELETE category route
  // @access Private
  delete: async(req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (category) {
        const removeCategory = await category.remove();
        if (removeCategory) {
          return res.json({ success: true });
        }
      }
    } catch(err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
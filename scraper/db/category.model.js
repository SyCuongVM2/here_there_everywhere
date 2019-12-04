const mongoose = require('mongoose');

const { Schema } = mongoose;
const categorySchema = new Schema({
  cate_code: {
    type: String,
    required: [true, 'Category must have code'],
  },
  en_name: {
    type: String,
    required: [true, 'Category must have English name'],
  },
  vn_name: {
    type: String,
    required: [true, 'Category must have Vietnamese name'],
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  ordered: {
    type: Number
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Category = mongoose.model('Category', categorySchema);
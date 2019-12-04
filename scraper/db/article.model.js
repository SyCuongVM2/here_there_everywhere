const mongoose = require('mongoose');

const { Schema } = mongoose;
const articleSchema = new Schema({
  article_date: String,
  article_url: String,
  article_thumb_art: String,
  article_title: String,
  article_desc: String,
  article_content: [
    {
      seq: Number,
      img_gallery: [
        {
          seq: Number,
          src: String
        }
      ],
      img_title: String,
      img_desc: String
    }
  ],
  article_tags: {
    type: [String]
  },
  article_source: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "category"
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      date_created: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Article = mongoose.model('Article', articleSchema);
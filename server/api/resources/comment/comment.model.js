const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  article: {
    type: Schema.Types.ObjectId,
    ref: "article"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  avatar: {
    type: String
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
  replies: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      name: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      avatar: {
        type: String
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "user"
          }
        }
      ],
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

module.exports = Comment = mongoose.model('comment', commentSchema);
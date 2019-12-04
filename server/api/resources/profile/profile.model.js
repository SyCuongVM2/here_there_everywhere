const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    intagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', profileSchema);
const mongoose = require('mongoose');
process.env["NODE_CONFIG_DIR"] = __dirname;
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  } 
};

module.exports = connectDB;
const config = {
  production: {
    SECRET: process.env.SECRET,
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT
  },
  development: {
    SECRET: 'NODE_JS_API',
    MONGO_URI: 'mongodb://localhost/htne',
    PORT: 5000
  }
};

module.exports = getConfig = (env) => config[env] || config.development;
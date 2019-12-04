const express = require('express');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const passport = require('passport');
// const socket = require('socket.io');

const DBConnect = require('./config/db');
const swaggerDocument = require('./config/swagger.json');
const configJWTStrategy = require('./api/middlewares/passport-jwt');
const restAPIRouter = require('./api');

const app = express();
const PORT = process.env.PORT || 5000;

DBConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(passport.initialize());
configJWTStrategy();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, { explorer: true }));
app.use('/api', restAPIRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server API is running on PORT: ${PORT}`);
});
// socket setup
// const io = socket(server);
// io.on('connection', (socket) => {
//   console.log(socket.id);

//   // handle chat event
//   socket.on('chat', (data) => {
//     io.sockets.emit('chat', data);
//   });
//   socket.on('typing', (data) => {
//     socket.broadcast.emit('typing', data);
//   });
// });
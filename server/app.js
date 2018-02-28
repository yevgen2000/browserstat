const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const index = require('./index');
const apiRoutes = require('./api/v1');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, '../public/images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(compression());

app.use(morgan('dev'));

app.use('/', index);
app.use('/api/v1', apiRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Not Found',
  });
});

const isDevMode = () => process.env.NODE_ENV === 'development';

const handleError = (err, res) => {
  const retCode = err.status || 500;
  res.status(retCode);
  return retCode;
};

/* eslint-disable no-unused-vars */
if (isDevMode()) {
  app.use((err, req, res, next) => {
    const retCode = handleError(err, res);
    res.status(retCode).json({
      status: retCode,
      message: err.message,
      detais: err.stack,
    });
  });
} else {
  app.use((err, req, res, next) => {
    const retCode = handleError(err, res);
    res.status(retCode).json({
      status: retCode,
      message: err.message,
    });
  });
}
/* eslint-enable no-unused-vars */

module.exports = app;

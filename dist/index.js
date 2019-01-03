'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _restRouter = require('./api/restRouter');

var _restRouter2 = _interopRequireDefault(_restRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use('/api/v1', _restRouter2.default);

app.get('/', function (req, res) {
  res.status(200).json({ message: 'Welcome to REST API for Questioner App' });
});

app.listen(6000, function () {
  console.log('APi Listerning on Port 6000');
});

exports.default = app;
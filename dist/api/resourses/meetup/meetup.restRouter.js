'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meetup = require('./meetup.controller');

var _meetup2 = _interopRequireDefault(_meetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meetupRouter = _express2.default.Router();

meetupRouter.route('/').get(_meetup2.default.getAll).post(_meetup2.default.createOne);

exports.default = meetupRouter;
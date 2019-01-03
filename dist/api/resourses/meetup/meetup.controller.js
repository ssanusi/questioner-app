'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _meetup = require('./meetup.model');

var _meetup2 = _interopRequireDefault(_meetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meetupController = {
  getAll: function getAll(req, res) {
    var Meetups = _meetup2.default.getAllMeetups();
    return res.status(200).json({ status: 200, data: Meetups });
  }
};

exports.default = meetupController;
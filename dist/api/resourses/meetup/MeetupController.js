"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MeetupModel = require("./MeetupModel");

var _MeetupModel2 = _interopRequireDefault(_MeetupModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MeetupController = function () {
  function MeetupController() {
    _classCallCheck(this, MeetupController);
  }

  _createClass(MeetupController, null, [{
    key: "getAllMeetups",
    value: function getAllMeetups(req, res) {
      var Meetups = _MeetupModel2.default.getAllMeetups();
      return res.status(200).json({ status: 200, data: Meetups });
    }
  }, {
    key: "createMeetup",
    value: function createMeetup(req, res) {
      _MeetupModel2.default.addMeetup(req.body);
      return res.status(201).json({ status: 201, data: [req.body] });
    }
  }, {
    key: "getAllupcoming",
    value: function getAllupcoming(req, res) {
      var upcomingMeetups = _MeetupModel2.default.getUpcomingMeetup();
      return res.status(200).json({ status: 200, data: upcomingMeetups });
    }
  }, {
    key: "getMeetupsById",
    value: function getMeetupsById(req, res) {
      var meetup = _MeetupModel2.default.getMeetupById(Number(req.params.id));
      if (!meetup) {
        return res.status(404).json({ message: "meetup not found" });
      }
      return res.status(200).json({ status: 200, data: [meetup] });
    }
  }, {
    key: "addRsvp",
    value: function addRsvp(req, res) {
      var validatedMeetup = req.body.validatedMeetup;

      _MeetupModel2.default.addRsvp(validatedMeetup);
      return res.status(201).json({ status: 201, data: [validatedMeetup] });
    }
  }]);

  return MeetupController;
}();

exports.default = MeetupController;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _meetup = require("./meetup.model");

var _meetup2 = _interopRequireDefault(_meetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meetupController = {
  getAll: function getAll(req, res) {
    var Meetups = _meetup2.default.getAllMeetups();
    return res.status(200).json({ status: 200, data: Meetups });
  },
  createOne: function createOne(req, res) {
    if (!req.body.topic || !req.body.location || !req.body.happeningOn || !req.body.tags) {
      return res.status(400).send({ message: "All fields are required" });
    }
    _meetup2.default.addMeetup(req.body);
    return res.status(201).json({ status: 201, data: [req.body] });
  },
  getAllupcoming: function getAllupcoming(req, res) {
    var upcomingMeetups = _meetup2.default.getUpcomingMeetup();
    return res.status(200).json({ status: 200, data: upcomingMeetups });
  },
  getMeetupsById: function getMeetupsById(req, res, next, id) {
    var meetup = _meetup2.default.getMeetupById(Number(id));
    if (!meetup) {
      return res.status(404).json({ message: "meetup not found" });
    }
    return res.status(200).json({ status: 200, data: [meetup] });
  },
  addRsvp: function addRsvp(req, res) {
    if (!req.body.user || !req.body.topic || !req.body.status || !req.params.id) {
      return res.status(400).json({ message: "all fields are required " });
    }
    var _req$body = req.body,
        user = _req$body.user,
        topic = _req$body.topic,
        status = _req$body.status;

    var newRsvp = { user: user, response: status, meetup: req.params.id };
    _meetup2.default.addRsvp(newRsvp);
    return res.status(201).json({ status: 201, data: [{ user: user, topic: topic, status: status }] });
  }
};

exports.default = meetupController;
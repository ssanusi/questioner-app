"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _MeetupController = require("./MeetupController");

var _MeetupController2 = _interopRequireDefault(_MeetupController);

var _meetupValidator = require("../../middleware/meetupValidator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meetupRouter = _express2.default.Router();

meetupRouter.route("/").get(_MeetupController2.default.getAllMeetups).post(_meetupValidator.validateAddMeetup, _MeetupController2.default.createMeetup);

meetupRouter.route("/upcoming").get(_MeetupController2.default.getAllupcoming);

meetupRouter.route("/:id").get(_MeetupController2.default.getMeetupsById);
meetupRouter.route("/:id/rsvps").post(_meetupValidator.validateAddRsvp, _MeetupController2.default.addRsvp);

exports.default = meetupRouter;
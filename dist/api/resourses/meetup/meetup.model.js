"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MeetupModel = function () {
  function MeetupModel() {
    _classCallCheck(this, MeetupModel);

    this.meetups = [];
  }

  _createClass(MeetupModel, [{
    key: "getAllMeetups",
    value: function getAllMeetups() {
      return this.meetups;
    }
  }, {
    key: "addMeetup",
    value: function addMeetup(newMeetup) {
      this.meetups.push(Object.assign({ id: this.meetups.length + 1, createdOn: (0, _moment2.default)() }, newMeetup));
      return true;
    }
  }, {
    key: "getUpcomingMeetup",
    value: function getUpcomingMeetup() {
      var today = (0, _moment2.default)();
      return this.meetups.filter(function (meetup) {
        return (0, _moment2.default)(meetup.happeningOn) - today > 0;
      });
    }
  }]);

  return MeetupModel;
}();

exports.default = new MeetupModel();
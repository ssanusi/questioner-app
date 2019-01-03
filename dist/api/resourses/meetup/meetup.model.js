'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MeetupModel = function () {
  function MeetupModel() {
    _classCallCheck(this, MeetupModel);

    this.meetups = [{
      id: 1,
      createdOn: '2019-01-01T22:48:05.633',
      location: '235 adeola adeku VI lagos',
      topic: 'Introduction to Javascript',
      happeningOn: '2019-01-022T22:48:05.633',
      tags: ['programming', 'web', 'front-end']
    }, {
      id: 2,
      createdOn: '2019-01-01T22:48:05.633',
      location: '235 adeola adeku VI lagos',
      topic: 'Introduction to CSS3',
      happeningOn: '2019-01-022T22:48:05.633',
      tags: ['programming', 'web', 'front-end']
    }];
  }

  _createClass(MeetupModel, [{
    key: 'getAllMeetups',
    value: function getAllMeetups() {
      return this.meetups;
    }
  }]);

  return MeetupModel;
}();

exports.default = new MeetupModel();
import moment from "moment";

class MeetupModel {
  constructor() {
    this.meetups = [];
  }

  getAllMeetups() {
    return this.meetups;
  }

  addMeetup(newMeetup) {
    this.meetups.push(
      Object.assign({ id: this.meetups.length + 1, createdOn: moment() }, newMeetup)
    );
    return true;
  }

  getUpcomingMeetup() {
    const today = moment();
    return this.meetups.filter(meetup => moment(meetup.happeningOn) - today > 0);
  }

  getMeetupById(id) {
    return this.meetups.find(meetup => meetup.id === id);
  }
}

export default new MeetupModel();

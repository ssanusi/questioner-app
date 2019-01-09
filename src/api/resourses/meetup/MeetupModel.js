import moment from "moment";

class MeetupModel {
  constructor() {
    this.meetups = [];
    this.rsvps = [];
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

  addRsvp(newRsvp) {
    this.rsvps.push(Object.assign({ id: this.rsvps.length + 1 }, newRsvp));
    return true;
  }
}

export default new MeetupModel();

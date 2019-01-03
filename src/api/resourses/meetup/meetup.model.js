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
}

export default new MeetupModel();

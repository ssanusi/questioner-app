import meetupModel from './meetup.model';

const meetupController = {
  getAll(req, res) {
    const Meetups = meetupModel.getAllMeetups();
    return res.status(200).json({ status: 200, data: Meetups });
  }
};

export default meetupController;

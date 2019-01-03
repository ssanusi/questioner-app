import meetupModel from "./meetup.model";

const meetupController = {
  getAll(req, res) {
    const Meetups = meetupModel.getAllMeetups();
    return res.status(200).json({ status: 200, data: Meetups });
  },

  createOne(req, res) {
    if (!req.body.topic || !req.body.location || !req.body.happeningOn || !req.body.tags) {
      return res.status(400).send({ message: "All fields are required" });
    }
    meetupModel.addMeetup(req.body);
    return res.status(201).json({ status: 201, data: [req.body] });
  },
  getAllupcoming(req, res) {
    const upcomingMeetups = meetupModel.getUpcomingMeetup();
    return res.status(200).json({ status: 200, data: upcomingMeetups });
  },
  getMeetupsById(req, res, next, id) {
    const meetup = meetupModel.getMeetupById(Number(id));
    if (!meetup) {
      return res.status(404).json({ message: "meetup not found" });
    }
    return res.status(200).json({ status: 200, data: [meetup] });
  }
};

export default meetupController;

import meetupModel from "./MeetupModel";

class MeetupController {
  static getAllMeetups(req, res) {
    const Meetups = meetupModel.getAllMeetups();
    return res.status(200).json({ status: 200, data: Meetups });
  }

  static createMeetup(req, res) {
    meetupModel.addMeetup(req.body);
    return res.status(201).json({ status: 201, data: [req.body] });
  }

  static getAllupcoming(req, res) {
    const upcomingMeetups = meetupModel.getUpcomingMeetup();
    return res.status(200).json({ status: 200, data: upcomingMeetups });
  }

  static getMeetupsById(req, res) {
    const meetup = meetupModel.getMeetupById(Number(req.params.id));
    if (!meetup) {
      return res.status(404).json({ message: "meetup not found" });
    }
    return res.status(200).json({ status: 200, data: [meetup] });
  }

  static addRsvp(req, res) {
    const { validatedMeetup } = req.body;
    meetupModel.addRsvp(validatedMeetup);
    return res.status(201).json({ status: 201, data: [validatedMeetup] });
  }
}

export default MeetupController;

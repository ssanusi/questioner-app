import moment from "moment";
import db from "../../../db";

class MeetupController {
  static getAllMeetups(req, res) {
    const queryString = "SELECT * FROM meetups";
    db.query(queryString).then(data => {
      // if (data.rows.length === 0) {
      //   return res.status(404).json({ message: "no meetups" });
      // }
      res.status(200).json({ status: 200, data: data.rows });
    });
    // .catch(err => res.status(400).json({ err }));
  }

  static createMeetup(req, res) {
    const queryString = `INSERT INTO
      meetups(createdon, location, images, topic, happeningon, tags)
      VALUES($1, $2, $3, $4,$5,$6)
      returning *`;

    const values = [
      moment(new Date()),
      req.body.location,
      req.body.images,
      req.body.topic,
      req.body.happeningOn,
      req.body.tags
    ];
    db.query(queryString, values).then(data =>
      res.status(201).json({ status: 201, data: data.rows[0] })
    );
    // .catch(err => res.status(400).json({ error: err }));
  }

  static getAllupcoming(req, res) {
    const today = moment();
    const queryString = "SELECT * FROM meetups WHERE happeningon > $1";
    db.query(queryString, [today])
      .then(data =>
        // if (data.rows === 0) {
        //   return res.status(404).json({ message: "no meetups" });
        // }
        res.status(200).json({ status: 200, data: data.rows })
      )
      .catch(err => res.status(400).json({ err }));
  }

  static getMeetupsById(req, res) {
    const queryString = "SELECT * FROM meetups WHERE id = $1";
    const meetup = parseInt(req.params.id, 10);

    db.query(queryString, [meetup])
      .then(data => {
        if (data.rows.length === 0) {
          return res.status(404).json({ message: "meetup not found" });
        }
        return res.status(200).json({ status: 200, data: data.rows });
      })
      .catch(err => res.status(400).json({ err }));
  }

  static addRsvp(req, res) {
    const queryString = `INSERT INTO
    rsvps(meetupId, userId, response)
    VALUES($1, $2, $3)
    returning *`;
    const { validatedMeetup } = req.body;
    const values = [validatedMeetup.meetup, validatedMeetup.user, validatedMeetup.status];

    db.query(queryString, values)
      .then(data => res.status(201).json({ status: 201, data: data.rows }))
      .catch(err => res.status(400).json({ err }));
  }

  static deleteMeetup(req, res) {
    const queryString = "DELETE FROM meetups WHERE id = $1 returning *";
    const meetup = parseInt(req.params.id, 10);

    db.query(queryString, [meetup]).then(data => {
      if (data.rows.length === 0) {
        return res.status(404).json({ status: 404, message: "meetup not found" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "meetup deleted sucessfully", data: data.rows });
    });
  }
}

export default MeetupController;

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../Button';

const MeetupCard = ({
  id, image, topic, location, happeningon,
}) => (
  <div className="card meetup-menu-item">
    <img src={image} alt="" />
    <p className="meetup">
      {' '}
      {topic}
    </p>
    <p className="meetup">
      <i className="fas fa-map-marker-alt" />
      {' '}
      {location}
    </p>
    <p className="meetup">
      <i className="fas fa-calendar-alt" />
      {' '}
      {moment(happeningon).format('MMMM Do YYYY, h:mm:ss a')}
    </p>

    <Button className="btn btn-default">
      <Link to={`/meetups/${id}`}>view</Link>
    </Button>
  </div>
);

MeetupCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  happeningon: PropTypes.string.isRequired,
};

export default MeetupCard;

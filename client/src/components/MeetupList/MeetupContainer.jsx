import React from 'react';
import PropTypes from 'prop-types';
import MeetupCard from './MeetupCard';

const MeetupContainer = ({ meetups }) => {
  const meetupList = meetups.map((meetup) => {
    const {
      id, images, topic, location, happeningon,
    } = meetup;
    const image = images.join('');
    return (
      <MeetupCard
        key={id}
        id={id}
        image={image}
        topic={topic}
        location={location}
        happeningon={happeningon}
      />
    );
  });
  return <section className="card meetup-menu">{meetupList}</section>;
};

MeetupContainer.propTypes = {
  meetups: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default MeetupContainer;

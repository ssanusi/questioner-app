import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getUpcoming } from '../../state/meetup/actions';
import MeetupContainer from '../../components/MeetupList/MeetupContainer';

const MeetupsFeed = (props) => {
  const { upcoming, dispatch } = props;
  useEffect(() => {
    dispatch(getUpcoming());
  }, []);

  return (
    <section className="bg-light landing-main">
      <h2 className="text-center meetup">
        upcoming meetups from
        {' '}
        <span>{moment().format('MMMM Do YYYY')}</span>
      </h2>
      <MeetupContainer meetups={upcoming} />
    </section>
  );
};
MeetupsFeed.propTypes = {
  upcoming: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  upcoming: state.meetups.upcoming,
});

export default connect(
  mapStateToProps,
)(MeetupsFeed);

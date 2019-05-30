import React from 'react';
import { connect } from 'react-redux';
import { meetupsActions } from '../state/meetup/actions';

const Index = () => <div>Welcome To Questioner Application;</div>;
const mapStateToProps = state => ({
  upcoming: state.meetups.upcoming,
});
export default connect(
  mapStateToProps,
  { getUpcoming: meetupsActions.getUpcoming },
)(Index);

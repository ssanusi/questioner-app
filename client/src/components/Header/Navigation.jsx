import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navigation = ({ urls }) => {
  const urlList = urls.map(url => (
    <li key={url.id} className="text-white">
      <NavLink to={`/${url.link}`}>{url.name}</NavLink>
    </li>
  ));
  return (
    <nav className="col-3-4">
      <ul className="nav-container text-center">{urlList}</ul>
    </nav>
  );
};

Navigation.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  urls: state.urls,
});
export default connect(mapStateToProps)(Navigation);

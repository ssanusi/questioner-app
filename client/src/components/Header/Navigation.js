import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';

export const Navigation = ({ urls, signout, username }) => {
  const handleSignOut = () => {
    swal({
      text: 'Are you sure you want to leave this page',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willLeave) => {
      if (willLeave) {
        signout();
        removeUser();
        history.push('/');
      }
    });
  };
};

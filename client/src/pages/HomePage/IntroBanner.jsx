/* eslint-disable react/button-has-type */
import React from 'react';

const IntroBanner = () => (
  <section className="text-center intro-banner image-overlay">
    <h1>Crowd-source Questions for a meetup</h1>
    <button className="btn btn-intro-lg">
      <a href="#menu">view upcoming meetups</a>
    </button>
  </section>
);

export default IntroBanner;

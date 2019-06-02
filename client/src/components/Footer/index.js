import React from 'react';

const Footer = () => (
  <footer className="text-center">
    <p>
     &copy; Questioner
      {` ${new Date().getFullYear()}`}
    </p>
  </footer>
);

export default Footer;

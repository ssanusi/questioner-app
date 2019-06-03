import React from 'react';
import IntroBanner from './IntroBanner';
import MeetupsFeed from './MeetupsFeeds';
import Footer from '../../components/Footer';

const HomePage = () => (
  <main>
    <IntroBanner />
    <MeetupsFeed />
    <Footer />
  </main>
);

export default HomePage;

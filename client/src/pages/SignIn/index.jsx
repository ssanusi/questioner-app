import React from 'react';
import SignInForm from './SignInForm';
import pic from '../../static/img/highres_477352647.jpeg';

const SignIn = () => (
  <main className="flex-container">
    <section className="col-3-4 hero text-center">
      <h1>Sign up</h1>
      {' '}
      <div className="lead">
        <h4>to view</h4>
        <h4>
          Meetups
          {' '}
          <span>&raquo;</span>
        </h4>
      </div>
      <div>
        <img src={pic} alt="" />
      </div>
    </section>
    <section className="col-1-4 aside">
      <SignInForm />
    </section>
  </main>
);

export default SignIn;

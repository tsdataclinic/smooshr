import React from 'react';

export default function AboutPage() {
  return (
    <div className="about-page">
      <section>
        <h2>What is Smooshr?</h2>
        <p>
          Smooshr is a tool that aims to make common data cleaning tasks as easy
          as possible. Currently it is aimed at consolidating categorical
          variables from multiple different datasets in to a common taxonomy.
        </p>
      </section>
      <section>
        <h2>
          I want to try it out, can you suggest some datasets to try with it?
        </h2>
        <p>
          Why yes we can! Smooshr is designed with Open Data as one of it's
          primary usecases. Here is a list of some datasets that might be good
          to try
        </p>
        <ul>
          <li>NYC 311 Data: </li>
          <li>New Orleans 911 Data: </li>
        </ul>
      </section>
      <section>
        <h2>I found a bug! What should I do!</h2>
        <p>
          Don't tell anyone and never use the internet again.... just kidding,
          head over to our{' '}
          <a href="https://github.com/tsdataclinic/Smooshr">GitHub</a> repo for
          the project and open an issue, someome will be right along to help
          you! If you aren't comfortable with GitHub, then feel free to drop us
          an email at{' '}
          <a href="mailto:dataclinic@twosigma.com">dataclinic@twosigma.com</a>
        </p>
      </section>
      <section>
        <h2>
          I want Smooshr to do something it currently doesn't. Can you make it
          exactally want I want it to be?
        </h2>
        <p>
          Perhaps! We want Smooshr to be as useful as possible for a large group
          of people. Head over to our{' '}
          <a href="https://github.com/tsdataclinic/Smooshr/issues">GitHub</a>{' '}
          repo and open an issue describing your feature. We can guarentee that
          we will build everything people ask for, and we might not be able to
          develop it super quickly but we want to hear feedback! If you are
          interested in contributing a feature, start the conversation over on
          GitHub. We love pull requests!
        </p>
      </section>
      <section>
        <h2>Do you have a roadmap?</h2>
        <p>
          Yup you can check it out over on{' '}
          <a href="https://github.com/tsdataclinic/Smooshr">GitHub</a>
        </p>
      </section>
      <section>
        <h2>Who built this?</h2>
        <p></p>
      </section>
      <section>
        <h2>How can I contribute?</h2>
      </section>
    </div>
  );
}

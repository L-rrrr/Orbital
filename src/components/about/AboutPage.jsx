import React from 'react';
import './aboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>All About NUStay</h1>
      </header>
      <div className="about-content">
        <section className="about-section">
          <h2>How It Started</h2>
          <p>
            Navigating the current NUS accommodation website can be a daunting and frustrating experience for students seeking on-campus housing. The official NUS accommodation website is cluttered with numerous hyperlinks, making it difficult to find relevant information quickly and efficiently. Additionally, comparing the various hostels becomes a cumbersome task due to the scattered and inconsistent presentation of data. This can leave students feeling overwhelmed and uncertain about making the best choice for their living arrangements.

            Therefore, NUStay was created to provide a comprehensive and user-friendly platform for NUS students to find and compare hostels. We aim to offer a centralized platform with detailed information, reviews, and ratings of various hostels.
          </p>
        </section>
        <section className="about-section">
          <h2>Future Plans</h2>
          <p>
            We have several exciting plans for the future of NUStay, including:
            <ul>
              <li>Complete the mobile adaptation of the website, allowing students to browse and manage their hostel options on the go.</li>
              <li>Implementing advanced search and filter functionalities such as filter by distance to help users find their ideal accommodation more easily.</li>
              <li>Add a notification feature so that users will be notified when their comments in the forum are replied to by other users.</li>
              <li>Add more information to the hostel information page such as facilities and major events of each hostel.</li>
            </ul>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

// iqexpress-app/src/pages/User/About.jsx

import React from 'react';

function About() {
  return (
    <section className="about-page py-5">
      <div className="container">
        <h2 className="text-center mb-4">About iQexpress</h2>
        <p className="lead text-center mb-5">
          Your reliable partner in logistics and delivery.
        </p>
        <div className="row">
          <div className="col-md-6 mb-4">
            <h3>Our Mission</h3>
            <p>
              To provide fast, reliable, and secure logistics solutions that exceed customer expectations. We leverage technology and a dedicated team to ensure every package reaches its destination safely and on time.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <h3>Our Vision</h3>
            <p>
              To be the leading express delivery service provider, recognized for our innovation, customer-centric approach, and commitment to excellence in every delivery.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h3>Why Choose Us?</h3>
            <ul>
              <li>**Speed:** We prioritize urgent deliveries, ensuring your packages arrive quickly.</li>
              <li>**Reliability:** Our tracking system provides real-time updates, giving you peace of mind.</li>
              <li>**Security:** We handle every package with the utmost care and professionalism.</li>
              <li>**Customer Service:** Our support team is always ready to assist you.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
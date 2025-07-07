import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import Fade from 'react-reveal/Fade'; // Import Fade for animation
import Slide from 'react-reveal/Slide'; // Import Slide for animation

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero py-5 text-white bg-dark">
        <div className="container text-center">
          <h1 className="display-4 mb-3">Your Premier Courier Partner in London</h1>
          <p className="lead mb-4">
            Delivering packages swiftly and securely across United Kingdom and Worldwide.
            Experience unparalleled logistics with ADC Global.
          </p>
          <Link to="/track" className="btn btn-primary btn-lg me-3">
            Track Your Shipment
          </Link>
          <Link to="/contact" className="btn btn-outline-light btn-lg">
            Get a Free Quote
          </Link>
        </div>
      </section>

      {/* Why Choose Us / About Us Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="mb-3">Why Choose ADC Global?</h2>
              <p className="lead">
                At ADC Global, we pride ourselves on reliability, speed, and customer satisfaction.
                With years of experience in the logistics industry, we handle your packages with the utmost care,
                ensuring they reach their destination safely and on time.
              </p>
              <p>
                From small parcels to large cargo, our extensive network and dedicated team are equipped to manage
                all your shipping needs, both locally in London and internationally.
              </p>
              <Link to="/about" className="btn btn-info mt-3">Learn More About Us</Link>
            </div>
            <div className="col-lg-6">
              {/* Image related to delivery service */}
              <img src="./images/shipping.jpg" className="img-fluid rounded shadow-sm" alt="Delivery Service" />
            </div>
          </div>
        </div>
      </section>

      {/* Services/Features Section - Enhanced */}
      <section className="features py-5">
        <div className="container">
          <h2 className="text-center mb-5">Our Key Features</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <i className="bi bi-speedometer2 display-4 text-primary mb-3"></i>
                  <h3 className="card-title">Lightning-Fast Delivery</h3>
                  <p className="card-text">
                    Experience express shipping that ensures your packages arrive quickly,
                    minimizing wait times for you and your recipients.
                  </p>
                  {/* Image related to fast delivery */}
                  <img src="./images/Fastdelivery1.jpg" className="img-fluid rounded" alt="Fast Delivery" />
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <i className="bi bi-shield-lock display-4 text-success mb-3"></i>
                  <h3 className="card-title">Secure & Insured</h3>
                  <p className="card-text">
                    Your valuable items are handled with the highest level of care and come
                    with insurance options for your peace of mind.
                  </p>
                  <img src="./images/fastdelivery.jpg" className="img-fluid rounded" alt="Fast and Secure" />
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <i className="bi bi-globe display-4 text-warning mb-3"></i>
                  <h3 className="card-title">Extensive Global Reach</h3>
                  <p className="card-text">
                    Whether it's within the U.K or across continents, our robust network
                    delivers to almost any destination worldwide.
                  </p>
                  {/* Image related to logistics */}
                  <img src="./images/Logistics.jpeg" className="img-fluid rounded" alt="Logistics Warehouse" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-lg btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="mb-3">Ready to Ship Your Next Package?</h2>
          <p className="lead mb-4">
            Get an instant quote or speak to our friendly customer service team.
          </p>
          <Link to="/contact" className="btn btn-light btn-lg me-3">
            Contact Us Today
          </Link>
          <Link to="/track" className="btn btn-outline-light btn-lg">
            Track Your Delivery
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
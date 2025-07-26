// iqexpress-app/src/pages/User/Services.jsx

import React from 'react';

function Services() {
  return (
    <section className="services-page py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Our Services</h2>
        <p className="text-center lead mb-5">
          At IQ Express, we offer a comprehensive range of logistics solutions
          designed to meet your every need, whether personal or business.
        </p>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-box-seam me-2"></i>Express Delivery</h5>
                <p className="card-text">
                  Need it there fast? Our express delivery service ensures your
                  parcels reach their destination with speed and precision.
                  Perfect for urgent documents and time-sensitive packages.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-truck me-2"></i>Freight & Cargo</h5>
                <p className="card-text">
                  For larger shipments and bulk cargo, our freight services
                  provide reliable and cost-effective transportation solutions,
                  domestically and internationally.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-globe me-2"></i>International Shipping</h5>
                <p className="card-text">
                  Navigate global logistics with ease. We offer secure and efficient
                  international shipping services, handling customs and compliance.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-warehouse me-2"></i>Warehousing & Storage</h5>
                <p className="card-text">
                  Flexible and secure warehousing solutions for short-term or
                  long-term storage needs, ensuring your goods are safe and accessible.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-arrow-repeat me-2"></i>Returns Management</h5>
                <p className="card-text">
                  Streamline your reverse logistics with our efficient returns
                  management services, making the process hassle-free for you and your customers.
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary"><i className="bi bi-clock me-2"></i>24/7 Support</h5>
                <p className="card-text">
                  Our dedicated customer support team is available around the clock
                  to assist you with any queries or tracking updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
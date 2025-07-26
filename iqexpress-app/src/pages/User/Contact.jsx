// iqexpress-app/src/pages/User/Contact.jsx

import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    // In a real application, you would send this data to your backend API
    // For now, we'll just simulate a submission.
    console.log('Contact form submitted:', formData);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate a successful response
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form

    } catch (error) {
      setFormStatus('error');
      console.error('Failed to submit contact form:', error);
    }
  };

  return (
    <section className="contact-page py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Contact Us</h2>
        <p className="text-center lead mb-5">
          We'd love to hear from you! Whether you have a question about our
          services, need assistance, or just want to give feedback,
          feel free to reach out.
        </p>

        <div className="row g-4">
          {/* Contact Information Column */}
          <div className="col-md-5">
            <div className="card h-100 shadow-sm p-4">
              <h4 className="mb-3 text-primary">Get in Touch</h4>
              <p className="mb-3">
                <i className="bi bi-geo-alt-fill me-2"></i>
                123 Express Lane, Logistics City, LG 001, Nigeria
              </p>
              <p className="mb-3">
                <i className="bi bi-telephone-fill me-2"></i>
                +234 800 123 4567
              </p>
              <p className="mb-3">
                <i className="bi bi-envelope-fill me-2"></i>
                <a href="mailto:info@iqexpress.com" className="text-decoration-none">info@iqexpress.com</a>
              </p>
              <p className="mb-3">
                <i className="bi bi-clock-fill me-2"></i>
                Mon - Fri: 9:00 AM - 5:00 PM (WAT)
              </p>

              <h4 className="mt-4 mb-3 text-primary">Follow Us</h4>
              <div className="d-flex social-icons">
                <a href="#" className="text-decoration-none text-dark me-3"><i className="bi bi-facebook fs-4"></i></a>
                <a href="#" className="text-decoration-none text-dark me-3"><i className="bi bi-twitter fs-4"></i></a>
                <a href="#" className="text-decoration-none text-dark me-3"><i className="bi bi-instagram fs-4"></i></a>
                <a href="#" className="text-decoration-none text-dark"><i className="bi bi-linkedin fs-4"></i></a>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="col-md-7">
            <div className="card h-100 shadow-sm p-4">
              <h4 className="mb-3 text-primary">Send us a Message</h4>
              <form onSubmit={handleSubmit}>
                {formStatus === 'success' && (
                  <div className="alert alert-success" role="alert">
                    Your message has been sent successfully! We'll get back to you soon.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="alert alert-danger" role="alert">
                    Failed to send message. Please try again later.
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
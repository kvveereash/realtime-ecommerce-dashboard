import React from 'react'

import "./Contact.css";

function Contact() {
  return (
    <div className="contact">

      <div className="contact-wrapper">

        {/* LEFT IMAGE */}
        <div className="contact-left">
          <img
            src="assets/conatct.jpg"
            alt="contact"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="contact-right">

          <h1>Get in touch</h1>

          <p className="contact-desc">
            Have you got a suggestion or a blog post idea? Or maybe you represent a
            company and would like to work on a partnership? I would love to hear from you!
          </p>

          <p className="contact-info">info@thos.com</p>
          <p className="contact-info">123-456-7890</p>

          <form className="contact-form">

            <label>Name*</label>
            <input type="text" placeholder="Your name" />

            <label>Last name</label>
            <input type="text" placeholder="Your last name" />

            <label>Your email*</label>
            <input type="email" placeholder="Your email address" />

            <label>Message*</label>
            <textarea placeholder="Enter your message"></textarea>

            <button type="submit">Submit</button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;
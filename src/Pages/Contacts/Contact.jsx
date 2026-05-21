import React from 'react'
import { motion } from "framer-motion";
import "./Contact.css";

function Contact() {
  return (
    < motion.div className="contact" initial={{ opacity: 0 }}   animate={{opacity: 1}}transition={{duration: 0.7}}>

      <motion.div className="contact-wrapper" initial={{ opacity: 0 }}   animate={{opacity: 1}}transition={{duration: 0.7}}>

        {/* LEFT IMAGE */}
        <motion.div className="contact-left" initial={{ opacity: 0 }}   animate={{opacity: 1}}transition={{duration: 0.7}}>
          <img
            src="assets/conatct.jpg"
            alt="contact"
          />
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div className="contact-right" initial={{ opacity: 0 }}   animate={{opacity: 1}}transition={{duration: 0.7}}>

          <h1>Get in touch</h1>

          <p className="contact-desc">
            Have you got a suggestion or a blog post idea? Or maybe you represent a
            company and would like to work on a partnership? I would love to hear from you!
          </p>

          <p className="contact-info">info@thos.com</p>
          <p className="contact-info">123-456-7890</p>

          <motion.form className="contact-form"initial={{ opacity: 0 }}   animate={{opacity: 1}}transition={{duration: 0.7}}>

            <label>Name*</label>
            <input type="text" placeholder="Your name" />

            <label>Last name</label>
            <input type="text" placeholder="Your last name" />

            <label>Your email*</label>
            <input type="email" placeholder="Your email address" />

            <label>Message*</label>
            <textarea placeholder="Enter your message"></textarea>

            <button type="submit">Submit</button>

          </motion.form>

        </motion.div>

      </motion.div>

    </motion.div>
  );
}

export default Contact;
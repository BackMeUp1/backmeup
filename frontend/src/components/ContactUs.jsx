
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css'; 

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('backmeup', 'template_wlxyb6t', form.current, 'F8GyBd_ZHDoAmsACU')
      .then((result) => {
        console.log(result.text);
        console.log("message sent");
      }, (error) => {
        console.log(error.text);
        console.log("msg error")
      });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail}>
        <div className="form-group">
          <label htmlFor="user_name">Name</label>
          <input type="text" id="user_name" name="user_name" />
        </div>
        <div className="form-group">
          <label htmlFor="user_email">Email</label>
          <input type="email" id="user_email" name="user_email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactUs;


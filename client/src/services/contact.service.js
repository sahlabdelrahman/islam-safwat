/** @format */

import axios from "axios";

const handleContact = async (name, email, subject, message) => {
  return await axios.post(`api/contact`, {
    name,
    email,
    subject,
    message,
  });
};

const ContactService = { handleContact };

export default ContactService;

/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";

import ContactService from "services/contact.service";
import { handleContact } from "store/actions/contact.action";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "store/actions/ui.action";

import { getMessageFromError } from "functions/handleErrors";

const { Grid, Button } = require("@mui/material");

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await ContactService.handleContact(name, email, subject, message)
      .then((res) => {
        dispatch(showSuccessSnackbar(res.data.msg));
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        dispatch(handleContact());
      })
      .catch((error) => {
        const message = getMessageFromError(error);
        dispatch(showErrorSnackbar(message));
      });
    setLoading(false);
  };

  return (
    <Grid item xs={12} md={6} className="form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={2}
            maxLength={30}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            minLength={6}
            maxLength={30}
          />
        </div>
        <div>
          <label>Subject</label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            minLength={2}
            maxLength={100}
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            required
            value={message}
            rows={8}
            maxLength={2200}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div>
          {loading ? (
            <Button variant="contained" disabled>
              Loading...
            </Button>
          ) : (
            <>
              <Button className="button" type="submit">
                Send
              </Button>
            </>
          )}
        </div>
      </form>
    </Grid>
  );
};

export default Form;

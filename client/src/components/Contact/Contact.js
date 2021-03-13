import React, { useContext } from "react";
import axios from "axios";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { store } from "../../store";
import "./Contact.css";

const Contact = ({ contact }) => {
  const { dispatch, state } = useContext(store);
  const { loggedInUser } = state;

  const enterChat = () => {
    dispatch({ type: "ENTER_CHAT", payload: contact });
    axios
      .get("http://localhost:3001/chat", {
        params: {
          from: `${loggedInUser.uid};${contact.uid}`,
          to: `${loggedInUser.uid};${contact.uid}`,
        },
      })
      .then(async (res) => {
        const messages = await res.data;
        dispatch({ type: "GET_MESSAGES", payload: messages });
      });
  };

  return (
    <div className="contact" onClick={enterChat}>
      <div className="contact__avatar">
        <AccountCircleIcon />
      </div>
      <div className="contact__text">
        <h2>{contact.username === "" ? contact.mobile : contact.username}</h2>
        <p>Last message here</p>
      </div>
    </div>
  );
};

export default Contact;

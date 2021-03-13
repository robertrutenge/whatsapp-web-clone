import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import { IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import { store } from "../../store";
import "./Chat.css";

const Chat = () => {
  const [canShowSendIcon, setCanShowSendIcon] = useState(false);
  const messageInputRef = useRef(null);
  const { state, dispatch } = useContext(store);
  const { loggedInUser, selectedChatUser, messages } = state;

  useEffect(() => {
    var pusher = new Pusher("XXX", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      console.log("Message Added");
      dispatch({ type: "ADD_MESSAGE", payload: newMessage });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    let message = messageInputRef.current.value;
    let data = {
      from: loggedInUser.uid,
      to: selectedChatUser.uid,
      message,
    };
    await axios.post("http://localhost:3001/message", data).then((res) => {
      if (res.status === 201) {
        setCanShowSendIcon(false);
        messageInputRef.current.value = "";
      }
    });
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <AccountCircleIcon />

          <h3>
            {selectedChatUser.username === ""
              ? selectedChatUser.mobile
              : selectedChatUser.username}
          </h3>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages &&
          messages.map((message, index) => (
            <div
              className={`chat__message ${
                message.from === loggedInUser.uid
                  ? "chat__messageOut"
                  : "chat__messageIn"
              }`}
              key={message._id}
            >
              <div className="chat__messageCotainer">
                <span className="chat__messageContent">{message.message}</span>
                <span class="chat__messageTime">18:22</span>
              </div>
            </div>
          ))}
      </div>

      <div className="chat_footer">
        <SentimentSatisfiedIcon />
        <AttachFileIcon />
        <input
          type="text"
          placeholder="Type a message"
          ref={messageInputRef}
          onFocus={() => setCanShowSendIcon(true)}
        />
        {!canShowSendIcon ? (
          <KeyboardVoiceIcon />
        ) : (
          <IconButton onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Chat;

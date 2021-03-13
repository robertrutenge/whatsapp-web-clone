import React from "react";
import connectionImg from "../../assets/connection.jpg";
import "./NoChatSelected.css";

const NoChatSelected = () => {
  return (
    <div className="NoChatSelected">
      <img src={connectionImg} alt="Connection" />
      <div className="NoChatSelected__description">
        <h1>Keep your phone connected</h1>
        <p>
          WhatsApp connects to your phone to sync messages. To reduce data
          usage, connect your phone to Wi-Fi.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

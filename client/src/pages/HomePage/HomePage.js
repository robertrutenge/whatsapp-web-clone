import React, { useContext } from "react";
import Chat from "../../components/Chat/Chat";
import NoChatSelected from "../../components/NoChatSelected/NoChatSelected";
import Sidebar from "../../components/Sidebar/Sidebar";
import { store } from "../../store";

const HomePage = () => {
  const { state } = useContext(store);
  const { isChatSelected } = state;
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      {isChatSelected ? <Chat /> : <NoChatSelected />}
    </div>
  );
};

export default HomePage;

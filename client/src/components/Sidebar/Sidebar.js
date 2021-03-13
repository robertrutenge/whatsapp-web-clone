import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ChatIcon from "@material-ui/icons/Chat";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { store } from "../../store";
import Contact from "../Contact/Contact";
import "./Sidebar.css";

const Sidebar = ({ setCanShowChat }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { state, dispatch } = useContext(store);
  const [contacts, setContacts] = useState([]);
  const { loggedInUser, users } = state;

  useEffect(() => {
    axios.get("http://localhost:3001/users").then(async (res) => {
      const users = await res.data;
      dispatch({ type: "GET_USERS", payload: users });
    });
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      console.log("contacts retrieved  = ", users);
      let retrievedUsers = users.filter((u) => u.uid !== loggedInUser.uid);
      setContacts(retrievedUsers);
    }
  }, [users]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header_left">
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
          {loggedInUser.mobile}
        </div>
        <div className="sidebar__header_right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>New Group</MenuItem>
            <MenuItem onClick={handleClose}>Create a room</MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Archived</MenuItem>
            <MenuItem onClick={handleClose}>Starred</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>

      <div className="sidebar__chats">
        {contacts.map((contact) => (
          <Contact contact={contact} key={contact.uid} />
        ))}
      </div>
    </div>
  );
};
export default Sidebar;

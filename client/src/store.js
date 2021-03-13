import React, { createContext, useReducer } from "react";

const initialState = {
  messages: [],
  loggedInUser: {},
  users: [],
  isChatSelected: false,
  selectedChatUser: {},
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, loggedInUser: action.payload };
    case "GET_MESSAGES":
      return { ...state, messages: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "ENTER_CHAT":
      return {
        ...state,
        isChatSelected: true,
        selectedChatUser: action.payload,
      };
    default:
      return state;
  }
};

const store = createContext(null);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

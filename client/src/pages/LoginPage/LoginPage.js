import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase";
import { FirebaseAuth } from "react-firebaseui";
import { store } from "../../store";
import logo from "../../assets/logo.png";
import "./LoginPage.css";
import HomePage from "../HomePage/HomePage";
import axios from "axios";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Phone as auth providers.
  signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
};

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch } = useContext(store);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setIsLoggedIn(true);
        dispatch({
          type: "SET_USER",
          payload: { mobile: user.phoneNumber, uid: user.uid },
        });

        axios
          .post("http://localhost:3001/user", {
            mobile: user.phoneNumber,
            uid: user.uid,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("Not logged In ");
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoggedIn && !isLoading && (
        <div className="login">
          <div className="login__header">
            <img
              src={logo}
              alt="whatsapp logo"
              className="login__header__logo"
            />
            <div className="login__header_title">Whatsapp Web</div>
          </div>

          <div className="login__content">
            <div className="login__content__row">
              <div className="login__content__row__description">
                <h1>To use WhatsApp on your computer:</h1>
                <ol>
                  <li>
                    We need your mobile number so as we can create your account.
                  </li>
                  <li>
                    Click verify to receive sms verification and proceed to
                    login
                  </li>
                  <li>Chat with other registered users </li>
                </ol>
              </div>
              <div>
                <FirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && !isLoading && <HomePage />}
    </>
  );
};

export default LoginPage;

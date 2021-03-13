import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import firebase from "firebase";
import { StateProvider } from "./store";

const firebaseConfig = {
  apiKey: "XXXXX",
  authDomain: "XXXX",
  databaseURL: "XXXXXX",
  projectId: "XXXXX",
  storageBucket: "XXXXX",
  messagingSenderId: "XXXXX",
  appId: "XXXX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <StateProvider>
        <LoginPage />
      </StateProvider>
    </div>
  );
}

export default App;

import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import User from "./User.js";
import Message from "./Message.js";
const app = express();
const PORT = 3001;

//connect to DB
const connection_url = "mongodb+srv://YOUR_CONNECTION_URL";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const pusher = new Pusher({
  appId: "XXXX",
  key: "XXXX",
  secret: "XXXX",
  cluster: "XXX",
  useTLS: "XXX",
});

db.once("open", () => {
  console.log("DB is connected");
  const messageCollection = db.collection("messages");
  const changeStream = messageCollection.watch();

  changeStream.on("change", (change) => {
    console.log("changeStream Triggered");
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        from: messageDetails.from,
        to: messageDetails.to,
        message: messageDetails.message,
        createdAt: messageDetails.createdAt,
        isReceived: messageDetails.isReceived,
        _id: messageDetails._id,
      });
    } else {
      console.log("Error triggering pusher");
    }
    console.log(change);
  });
});

//Middleware
app.use(express.json());

app.post("/user", async (req, res) => {
  // Check if user exists
  const user = await User.findOne({ uid: req.body.uid });

  if (!user) {
    User.create(req.body, (error, data) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        return res.status(201).send(data);
      }
    });
  } else {
    return res.status(200).send(user);
  }
});

app.get("/users", (req, res) => {
  User.find((error, data) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(200).send(data);
    }
  });
});

app.post("/message", (req, res) => {
  Message.create(req.body, (error, data) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(201).send(data);
    }
  });
});

app.get("/chat", (req, res) => {
  let fromArr = req.query.from.split(";");
  let toArr = req.query.to.split(";");
  Message.find(
    { from: { $in: fromArr }, to: { $in: toArr } },
    (error, data) => {
      if (error) {
        return res.status(500).send(error);
      } else {
        return res.status(200).send(data);
      }
    }
  );
});

app.listen(PORT, "localhost", () => {
  console.log(`Server started at localhost://${PORT}`);
});

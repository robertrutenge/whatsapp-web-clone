import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  mobile: { type: String, required: true },
  username: { type: String, required: false, default: "" },
});

export default mongoose.model("user", userSchema);

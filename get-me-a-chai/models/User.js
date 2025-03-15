import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  username: { type: String, required: true },
  profilepic: { type: String },
  coverpic: { type: String },
  createdAt: { type: Date, default: Date.now },
  razorpayid:{type:String},
  razorpaysecret:{type:String},
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || model("User", userSchema);

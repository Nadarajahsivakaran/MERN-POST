import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: ["First Name is required"] },
    lastName: { type: String, required: ["Last Name is required"] },
    email: { type: String, required: ["Email is required"] },
    password: { type: String, required: ["Password is required"] },
    categories: [{label:String, icon:String}]
  },
  { timestamps: true }
);

export default new mongoose.model("User", userSchema);

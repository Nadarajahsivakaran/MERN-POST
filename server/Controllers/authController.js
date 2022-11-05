import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../Models/user.js";

const categories = [
  { label: "Travel" ,icon:"user"},
  { label: "Shopping" ,icon:"user"},
  { label: "Investment" ,icon:"user"},
  { label: "bills" ,icon:"user"},
];

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(406).json({ message: "Credential not found" });
    return;
  }

  const matched = bcrypt.compare(password, user.password);
  if (!matched) {
    res.status(406).json({ message: "Credential not found" });
    return;
  }

  const payload = {
    userName: email,
    _id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRETE);
  res.json({ message: "Successfully Loggedin", token, user });
};



export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(406).json({ message: "user alrady exist" });
    return;
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashPassword = await bcrypt.hashSync(password, salt);

  const user = await new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
    categories
  });
  await user.save();

  res.status(201).json({ message: "user created Successfully" });
};

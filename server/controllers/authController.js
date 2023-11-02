import UserModel from "../models/User.js";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_TOKEN = process.env.JWT_TOKEN;

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    console.log(users)
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({ error: "No such user found" });
    }
    const passMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!passMatch) {
      return res.status(400).json({ error: "Bad Auth" });
    }
    const token = jwt.sign({user:user}, JWT_TOKEN, {expiresIn:'30d'});
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Account already exists." });
    }

    const existingNewUser = await UserModel.findOne({
      username: req.body.username,
    });
    if (existingNewUser)
      return res.status(400).json({ error: "Username already taken." });

    const user = await newUser.save();
    const token = jwt.sign({ user: newUser }, JWT_TOKEN, {expiresIn:'30d'});
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

import { Router } from "express";
import { getAllUsers, getUserById, login, signup } from "../controllers/authController.js";
const authRouter = Router();

authRouter.get("/", getAllUsers);
authRouter.get("/:id", getUserById);
authRouter.post("/login", login);
authRouter.post("/create", signup);

export default authRouter;

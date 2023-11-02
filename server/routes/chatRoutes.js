import { Router } from "express";
import { createChat, userChats, findChats } from "../controllers/chatControllers.js";

export const ChatRouter = Router();

ChatRouter.post('/', createChat)
ChatRouter.get('/:userId', userChats)
ChatRouter.get('/:userId/:recieverId', findChats)

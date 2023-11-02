import { Router } from "express";
import { addMessage, findMessages } from "../controllers/messageController.js";

const messageRouter = Router();


messageRouter.post('/', addMessage);
messageRouter.get('/:chatId', findMessages);


export default messageRouter;

import express from 'express'
import cors from 'cors'
import { ChatRouter } from './routes/chatRoutes.js';
import authRouter from './routes/authRoutes.js';
import messageRouter from './routes/messageRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send("Welcome to the chat app")    
})

app.use('/api/v1/chats', ChatRouter);
app.use('/api/v1/users', authRouter);
app.use('/api/v1/messages', messageRouter);


export default app;
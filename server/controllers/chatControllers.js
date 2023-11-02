import ChatModel from "../models/Chat.js";

export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.recieverId],
  });
  try {
    const result = await newChat.save();
    return res.status(202).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const userChats = async (req, res) => {
  try {
    const chats = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const findChats = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.userId, req.params.recieverId] },
    });
    if (!chat) {
      const newChat = new ChatModel({
        members: [req.params.userId, req.params.recieverId],
      });
      const result = await newChat.save();
      return res.status(202).json(result);
    }
    return res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

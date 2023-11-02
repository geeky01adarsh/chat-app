import messageModel from "../models/Message.js";

export const addMessage = async (req, res) => {
  try {
    const newMessage = messageModel({
      chatId: req.body.chatId,
      senderId: req.body.senderId,
      message: req.body.message,
    });
    const message = await newMessage.save();
    return res.status(202).json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const findMessages = async (req, res) => {
  try {
    const allMessages = await messageModel.find({ chatId: req.params.chatId });
    return res.status(200).json(allMessages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

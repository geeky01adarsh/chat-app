import mongoose from "mongoose";

const MessageScehma = mongoose.Schema(
  {
    chatId: { 
        type: String 
    },
    senderId: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("Message", MessageScehma);
export default messageModel;

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import { URL } from "../App";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const getUserData = async () => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    try {
      const { data } = await axios.get(`${URL}/users/${userId}`);
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // fetching data for header
  useEffect(() => {
    getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        await getUserData();
        const { data } = await axios.get(`${URL}/messages/${chat._id}`);
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser._id,
      message: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser._id);
    
    // // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await axios.post(`${URL}/messages`, message);
      if (messages.length) {
        setMessages([...messages, data]);
      } else setMessages([data]);
      setNewMessage("");
    } catch (error) {
      console.log(error.message);
      alert("Can't send the message!!!");
    }
  };

  // Receive Message from parent component
    useEffect(() => {
      console.log("Message Arrived: ", receivedMessage);
      if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
        setMessages([...messages, receivedMessage]);
      }
    }, [receivedMessage]);

  const scroll = useRef();
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>{userData ? userData.username : ""}</span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body">
              {/* {console.log(messages)} */}
              {!messages.length ? (
                <>Send your first message...</>
              ) : (
                messages.map((message) => (
                  <>
                    {/* <span>hi</span> */}
                    <div
                      ref={scroll}
                      className={
                        message.senderId === currentUser._id
                          ? "message own"
                          : "message"
                      }
                    >
                      <span>{message.message}</span>{" "}
                      <span>{format(message.createdAt)}</span>
                    </div>
                  </>
                ))
              )}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-btn" onClick={handleSend}>
                Send
              </div>
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;

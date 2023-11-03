import React, { useContext, useEffect, useRef, useState } from "react";
import { URL, userContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";

const Home = () => {
  const user = useContext(userContext);
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.user.login) {
      navigate("/login");
    }
  }, []);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);

  const getChats = async () => {
    try {
      const chatsData = await axios.get(`${URL}/users`);
      const allChats = chatsData.data.filter(({ _id }) => {
        return _id !== user.user.user._id;
      });
      setChats(allChats);
    } catch (error) {
      console.error(error.message);
      alert("Can't load chats at the moment");
    }
  };

  const getCurrChat = async (chat) => {
    try {
      const { data } = await axios.get(
        `${URL}/chats/${user.user.user._id}/${chat._id}`
      );
      setCurrentChat(data);
    } catch (error) {
      console.error(error.message);
      alert("Can't load this chat");
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    socket.current = io("https://chat-app-socket-io-987i.onrender.com");
    socket.current.emit("new-user-add", user.user.user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const online = onlineUsers.find((user) => user.userId === chat._id);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  getCurrChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user.user.user}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <ChatBox
          chat={currentChat}
          currentUser={user.user.user}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Home;
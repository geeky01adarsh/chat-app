import React, { useContext, useEffect, useState } from "react";
import { URL, userContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";

const Home = () => {
  const user = useContext(userContext);
  const [currentChat, setCurrentChat] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.user.login) {
      navigate("/login");
    }
  }, []);
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    try {
      const chatsData = await axios.get(`${URL}/users`);
      const allChats = chatsData.data.filter(({ _id }) => {
        return _id !== user.user.user._id;
      });
      console.log(allChats);
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
                  currentUser={user.user.user._id}
                  online={true}
                  // online={checkOnlineStatus(chat)}
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
          //   setSendMessage={setSendMessage}
          //   receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Home;

// import React, { useRef, useState } from "react";
// import ChatBox from "../../components/ChatBox/ChatBox";
// import Conversation from "../../components/Coversation/Conversation";
// import NavIcons from "../../components/NavIcons/NavIcons";
// import "./Chat.css";
// import { useEffect } from "react";
// import { userChats } from "../../api/ChatRequests";
// import { useDispatch, useSelector } from "react-redux";
// import { io } from "socket.io-client";

// const Chat = () => {
//   const dispatch = useDispatch();
//   const socket = useRef();
//   const { user } = useSelector((state) => state.authReducer.authData);

//   const [chats, setChats] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [sendMessage, setSendMessage] = useState(null);
//   const [receivedMessage, setReceivedMessage] = useState(null);
//   // Get the chat in chat section
//   useEffect(() => {
//     const getChats = async () => {
//       try {
//         const { data } = await userChats(user._id);
//         setChats(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getChats();
//   }, [user._id]);

//   // Connect to Socket.io
//   useEffect(() => {
//     socket.current = io("ws://localhost:8800");
//     socket.current.emit("new-user-add", user._id);
//     socket.current.on("get-users", (users) => {
//       setOnlineUsers(users);
//     });
//   }, [user]);

//   // Send Message to socket server
//   useEffect(() => {
//     if (sendMessage!==null) {
//       socket.current.emit("send-message", sendMessage);}
//   }, [sendMessage]);

//   // Get the message from socket server
//   useEffect(() => {
//     socket.current.on("recieve-message", (data) => {
//       console.log(data)
//       setReceivedMessage(data);
//     }

//     );
//   }, []);

//   const checkOnlineStatus = (chat) => {
//     const chatMember = chat.members.find((member) => member !== user._id);
//     const online = onlineUsers.find((user) => user.userId === chatMember);
//     return online ? true : false;
//   };

//   return (

//   );
// };

// export default Chat;

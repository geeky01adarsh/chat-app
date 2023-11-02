import React, { useState } from "react";
import { useEffect } from "react";

const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null);

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {data.username}
            </span>
            {/* <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span> */}
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;

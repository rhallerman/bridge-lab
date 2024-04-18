import React, { useState } from "react";
import "firebase/database";
import "./View.css";

const VideoChat = ({
  startCall,
  onLogin,
  setLocalVideoRef,
  setRemoteVideoRef,
  connectedUser,
  headerInputField,
  commentators,
  setCommentators,
  editable,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToCall, setUserToCall] = useState(null);
  const [username, setUsername] = useState(null);

  const onLoginClicked = async () => {
    await onLogin(username);
    setIsLoggedIn(true);
  };

  const onStartCallClicked = () => {
    startCall(username, userToCall);
  };

  const renderVideos = () => {
    return (
      <div>
        <div className="commentator">
          <video id="localVideo" ref={setLocalVideoRef} autoPlay></video>
          <div className="name">
            {editable
              ? headerInputField(
                  "",
                  commentators[0]?.name ?? "",
                  (event) => {
                    const tempCommentators = [...commentators];
                    tempCommentators[0].name = event.target.value.toUpperCase();
                    setCommentators(tempCommentators);
                  },
                  "center"
                )
              : commentators[0]?.name.toUpperCase() ?? ""}
          </div>
        </div>
        <div>
          <label>{connectedUser}</label>
          <video
            id="remoteVideo"
            ref={setRemoteVideoRef}
            autoPlay
            playsInline
          ></video>
        </div>
      </div>
    );
  };

  const renderForms = () => {
    return isLoggedIn ? (
      <div>
        <label>Call to</label>
        <input
          value={userToCall}
          type="text"
          onChange={(e) => setUserToCall(e.target.value)}
        />
        <button onClick={onStartCallClicked}>Call</button>
      </div>
    ) : (
      <div>
        <label>Type a name</label>
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={onLoginClicked}>Login</button>
      </div>
    );
  };

  return (
    <section>
      {connectedUser ? null : renderForms()}
      {renderVideos()}
    </section>
  );
};

export default VideoChat;

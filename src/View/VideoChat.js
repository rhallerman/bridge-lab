import React, { useState } from "react";
import "firebase/database";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CallIcon from "@mui/icons-material/Call";
import "./View.css";

const VideoChat = ({
  onLogin,
  startCall,
  localVideoRef,
  remoteVideoRef,
  connectedUser,
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
      <div className="commentators">
        <div className="commentator">
          <video ref={localVideoRef} autoPlay playsInline className="webcam" />
          <div className="name">{username?.toUpperCase()}</div>
        </div>
        {connectedUser && (
          <div className="commentator">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="webcam"
            />
            <div className="name">{connectedUser?.toUpperCase()}</div>
          </div>
        )}
      </div>
    );
  };

  const renderForms = () => {
    return isLoggedIn ? (
      <div key="a">
        <label>Call to</label>
        <input
          value={userToCall}
          type="text"
          onChange={(e) => setUserToCall(e.target.value)}
        />
        <IconButton onClick={onStartCallClicked}>
          <CallIcon />
        </IconButton>
      </div>
    ) : (
      <div key="b" className="form">
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <IconButton onClick={onLoginClicked}>
          <CheckIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <section id="container">
      {renderVideos()}
      {connectedUser ? null : renderForms()}
    </section>
  );
};

export default VideoChat;

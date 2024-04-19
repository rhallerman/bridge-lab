import React, { useContext, useState } from "react";
import "firebase/database";
import { IconButton, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CallIcon from "@mui/icons-material/Call";
import "./View.css";
import { Context } from "../Context/Context";

const VideoChat = ({
  onLogin,
  startCall,
  localVideoRef,
  remoteVideoRef,
  editable,
}) => {
  const { username, setUsername, connectedUser } = useContext(Context);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToCall, setUserToCall] = useState("");

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
          {editable ? (
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value.toUpperCase())}
              size="small"
              inputProps={{
                style: { color: "white", padding: 0 },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
          ) : (
            <div className="name">{username}</div>
          )}
        </div>
        {connectedUser && (
          <div className="commentator">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="webcam"
            />
            <div className="name">{connectedUser}</div>
          </div>
        )}
      </div>
    );
  };

  const renderForms = () => {
    return isLoggedIn ? (
      <div>
        <TextField
          value={userToCall}
          onChange={(e) => setUserToCall(e.target.value.toUpperCase())}
          size="small"
          inputProps={{
            style: { color: "white", padding: 0 },
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
        />
        <IconButton onClick={onStartCallClicked}>
          <CallIcon />
        </IconButton>
      </div>
    ) : (
      <div key="b" className="form">
        <IconButton onClick={onLoginClicked}>
          <CheckIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <section id="container">
      {renderVideos()}
      {connectedUser || !editable ? null : renderForms()}
    </section>
  );
};

export default VideoChat;

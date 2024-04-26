import React, { useContext, useState } from "react";
import "firebase/database";
import { IconButton, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import "./View.css";
import { Context } from "../Context/Context";

const VideoChat = ({
  onLogin,
  startCall,
  localVideoRef1,
  localVideoRef2,
  remoteVideoRef1,
  remoteVideoRef2,
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
    setUserToCall("");
  };

  const renderVideos = () => {
    return (
      <div className="commentators">
        <div className="commentator">
          {!editable && (
            <video
              ref={localVideoRef1}
              autoPlay
              playsInline
              className="webcam"
              muted
            />
          )}
          {editable && (
            <video
              ref={localVideoRef2}
              autoPlay
              playsInline
              className="webcam"
              muted
            />
          )}
          {(!editable || isLoggedIn) && <div className="name">{username}</div>}
          {editable && !isLoggedIn && (
            <TextField
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.toUpperCase());
                e.stopPropagation();
                e.preventDefault();
              }}
              size="small"
              inputProps={{
                style: { color: "white", padding: 0 },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
          )}
        </div>
        {connectedUser && !editable && (
          <div className="commentator">
            <video
              ref={remoteVideoRef1}
              autoPlay
              playsInline
              className="webcam"
              id="remoteVideo"
            />
            <div className="name">{connectedUser}</div>
          </div>
        )}
        {connectedUser && editable && (
          <div className="commentator">
            <video
              ref={remoteVideoRef2}
              autoPlay
              playsInline
              className="webcam"
              muted
            />
            <div className="name">{connectedUser}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="container">
      {renderVideos()}
      {editable &&
        (isLoggedIn ? (
          <div className="callTo">
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
            <IconButton onClick={onStartCallClicked} disabled={!userToCall}>
              <AddIcon />
            </IconButton>
          </div>
        ) : (
          <div className="callTo">
            <IconButton onClick={onLoginClicked} disabled={!username}>
              <CheckIcon />
            </IconButton>
          </div>
        ))}
    </section>
  );
};

export default VideoChat;

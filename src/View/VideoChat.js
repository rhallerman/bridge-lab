import React, { useState } from "react";
import "firebase/database";
import "./View.css";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { IconButton, TextField, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";

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
  const [connectTo, setConnectTo] = useState("");

  const handleConnectTo = (event) =>
    setConnectTo(event.target.value.toUpperCase());

  console.log(connectedUser);

  return (
    <div className="commentators">
      <div className="commentator">
        <video
          id="localVideo"
          className="webcam"
          ref={setLocalVideoRef}
          autoPlay
        />
        <div className="name">
          {editable
            ? headerInputField(
                "",
                commentators[0] ?? "",
                (event) => {
                  const tempCommentators = [...commentators];
                  tempCommentators[0] = event.target.value.toUpperCase();
                  setCommentators(tempCommentators);
                },
                "center"
              )
            : commentators[0]?.toUpperCase() ?? ""}
        </div>
        {editable && (
          <div className="commentatorControls">
            <IconButton
              className="removeCommentator"
              onClick={() => {
                console.log("remove");
                const tempCommentators = [...commentators];
                console.log(tempCommentators);
                // tempCommentators.splice(0, 1);
                // setCommentators(tempCommentators);
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
            {!isLoggedIn && (
              <IconButton
                className="logInCommentator"
                onClick={async () => {
                  console.log(commentators);
                  await onLogin(commentators[0]);
                  setIsLoggedIn(true);
                }}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        )}
      </div>
      {connectedUser && (
        <div className="commentator">
          <video
            id="remoteVideo"
            ref={setRemoteVideoRef}
            autoPlay
            playsInline
          />
        </div>
      )}
      {editable && isLoggedIn && !connectedUser && (
        <>
          <Typography variant="body1" className="connectTo">
            Connect to
          </Typography>
          <TextField
            value={connectTo}
            onChange={handleConnectTo}
            size="small"
            fullWidth
            inputProps={{
              style: { color: "white", padding: 0 },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
          <IconButton
            className="logInCommentator"
            size="small"
            onClick={async () => {
              console.log("calling...");
              console.log(commentators[0]);
              console.log(connectTo);
              await startCall(commentators[0], connectTo);
              console.log("started call");
            }}
          >
            <CallIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default VideoChat;

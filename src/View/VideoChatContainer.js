import React, { memo, useEffect } from "react";
import VideoChat from "./VideoChat";

const VideoChatContainer = ({
  localStream,
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
  useEffect(() => {
    if (editable && localStream) {
      const vidElem = document.getElementById("localVideo");
      vidElem.srcObject = localStream;
    }
  }, [editable, localStream]);

  return (
    <VideoChat
      startCall={startCall}
      onLogin={onLogin}
      setLocalVideoRef={setLocalVideoRef}
      setRemoteVideoRef={setRemoteVideoRef}
      connectedUser={connectedUser}
      headerInputField={headerInputField}
      commentators={commentators}
      setCommentators={setCommentators}
      editable={editable}
    />
  );
};

export default memo(VideoChatContainer);

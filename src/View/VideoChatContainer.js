import React, { memo, useEffect, useRef, useState } from "react";
import "firebase/compat/database";
import firebase from "firebase/compat/app";
import config from "./config";
import VideoChat from "./VideoChat";
import {
  addCandidate,
  createOffer,
  listenToConnectionEvents,
  sendAnswer,
} from "./RTCModule";
import "webrtc-adapter";
import { doAnswer, doCandidate, doLogin, doOffer } from "./FirebaseModule";

const VideoChatContainer = ({
  database,
  setDatabase,
  localStream,
  setLocalStream,
  localConnection,
  setLocalConnection,
  headerInputField,
  commentators,
  setCommentators,
  editable,
}) => {
  const [connectedUser, setConnectedUser] = useState(null);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (localVideoRef !== null) {
      firebase.initializeApp(config);
      const initiateLocalStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          localVideoRef.srcObject = stream;
          const vidElem = document.getElementById("localVideo");
          vidElem.srcObject = stream;
          vidElem.play();
          setLocalStream(stream);
          return stream;
        } catch (exception) {
          console.error(exception);
        }
      };
      initiateLocalStream();
      const initiateConnection = async () => {
        try {
          const configuration = {
            iceServers: [{ urls: "stun:stun2.1.google.com:19302" }],
          };
          const conn = new RTCPeerConnection(configuration);
          setLocalConnection(conn);
          return conn;
        } catch (exception) {
          console.error(exception);
        }
      };
      initiateConnection();
      setDatabase(firebase.database());
    }
  }, [localVideoRef]);

  const setLocalVideoRef = (ref) => {
    localVideoRef.current = ref;
  };

  const setRemoteVideoRef = (ref) => {
    remoteVideoRef.current = ref;
  };

  const handleUpdate = (notif, username) => {
    if (notif) {
      switch (notif.type) {
        case "offer":
          setConnectedUser(notif.from);
          listenToConnectionEvents(
            localConnection,
            username,
            notif.from,
            database,
            remoteVideoRef,
            doCandidate
          );
          sendAnswer(
            localConnection,
            localStream,
            notif,
            doAnswer,
            database,
            username
          );
          break;
        case "answer":
          setConnectedUser(notif.from);
          startCall(localConnection, notif);
          break;
        case "candidate":
          addCandidate(localConnection, notif);
          break;
        default:
          break;
      }
    }
  };

  const startCall = async (username, userToCall) => {
    listenToConnectionEvents(
      localConnection,
      username,
      userToCall,
      database,
      remoteVideoRef,
      doCandidate
    );
    createOffer(
      localConnection,
      localStream,
      userToCall,
      doOffer,
      database,
      username
    );
  };

  const onLogin = async (username) => {
    await doLogin(username, database, handleUpdate);
  };

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

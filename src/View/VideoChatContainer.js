import React, { useState, useEffect, useRef } from "react";
import {
  createOffer,
  startCall,
  sendAnswer,
  addCandidate,
  listenToConnectionEvents,
} from "./RTCModule";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import config from "./config";
import { doOffer, doAnswer, doLogin, doCandidate } from "./FirebaseModule";
import "webrtc-adapter";
import VideoChat from "./VideoChat";

const VideoChatContainer = () => {
  const [database, setDatabase] = useState(null);
  const [connectedUser, setConnectedUser] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [localConnection, setLocalConnection] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    firebase.initializeApp(config);
    const initiateLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (exception) {
        console.error(exception);
      }
    };
    initiateLocalStream();
    const initiateConnection = async () => {
      try {
        var configuration = {
          iceServers: [{ urls: "stun:stun2.1.google.com:19302" }],
        };
        const connection = new RTCPeerConnection(configuration);
        setLocalConnection(connection);
      } catch (exception) {
        console.error(exception);
      }
    };
    initiateConnection();
    setDatabase(firebase.database());
  }, []);

  const startCallHelper = async (username, userToCall) => {
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
    return await doLogin(username, database, handleUpdate);
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

  return (
    <VideoChat
      startCall={startCallHelper}
      onLogin={onLogin}
      localVideoRef={localVideoRef}
      remoteVideoRef={remoteVideoRef}
      connectedUser={connectedUser}
    />
  );
};

export default VideoChatContainer;

import React, { useState, useEffect, useMemo, useContext, useRef } from "react";
import "./App.css";
import View from "./View/View";
import Control from "./Control/Control";
import ReactDOM from "react-dom";
import { Context } from "./Context/Context";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import {
  createOffer,
  startCall,
  sendAnswer,
  addCandidate,
  listenToConnectionEvents,
} from "./View/RTCModule";
import { doOffer, doAnswer, doLogin, doCandidate } from "./View/FirebaseModule";
import VideoChat from "./View/VideoChat";
import config from "./View/config";
import "webrtc-adapter";
import { Button } from "@mui/material";

function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
    if (styleSheet.cssRules) {
      // for <style> elements
      const newStyleEl = sourceDoc.createElement("style");

      Array.from(styleSheet.cssRules).forEach((cssRule) => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) {
      // for <link> elements loading CSS from a URL
      const newLinkEl = sourceDoc.createElement("link");

      newLinkEl.rel = "stylesheet";
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}

function App() {
  const {
    setOcrHands,
    setLockedBy,
    realityOn,
    realityOff,
    setMode,
    setAssignTo,
    setTypedSuit,
    setTypedRank,
    setConnectedUser,
    setHost,
  } = useContext(Context);

  const [database, setDatabase] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [localConnection, setLocalConnection] = useState(null);

  const localStreamRef = useRef();
  localStreamRef.current = localStream;

  const localVideoRef1 = useRef(null);
  const localVideoRef2 = useRef(null);
  const remoteVideoRef1 = useRef(null);
  const remoteVideoRef2 = useRef(null);

  const capture = async () => {
    const canvas = document.createElement("canvas");
    const video = document.createElement("video");
    const captureStream = await navigator.mediaDevices.getDisplayMedia();
    video.srcObject = captureStream;
    await video.play();
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const crops = [
      [0.542, 0.14],
      [0.715, 0.45],
      [0.542, 0.715],
      [0.37, 0.45],
    ];
    const tempOcrHands = [];
    for (const crop of crops) {
      canvas
        .getContext("2d")
        .drawImage(
          video,
          video.videoWidth * crop[0],
          video.videoHeight * crop[1],
          video.videoHeight * 0.25,
          video.videoHeight * 0.19,
          0,
          0,
          video.videoHeight * 0.25,
          video.videoHeight * 0.19
        );
      const frame = canvas.toDataURL();
      const response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer ya29.a0Ad52N3-3AFbZGyOylDjmAQlbgy5j4pS_JMJEWliuS1-mXe4ShI1-ktQH0jBpQ4kNlpeThr4tb5nt9Ac0AQUUxErL7WkUbgGGDszLa9qLS02wNARa2hdzDP_paI50FDTRvkyDcA4NN9rIS6jRsRLIPCviiltxEQO9LmU5lMXohQaCgYKAWESARMSFQHGX2MiJPcnKI18sciTPVJKE8DzCg0177",
            "x-goog-user-project": "expanded-symbol-422006-g2",
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            requests: [
              {
                image: { content: frame.substring(22) },
                features: [{ type: "TEXT_DETECTION" }],
              },
            ],
          }),
        }
      );
      await response.json().then((response) => {
        console.log(response.responses[0].fullTextAnnotation.text);
        tempOcrHands.push(response.responses[0].fullTextAnnotation.text);
      });
    }
    setOcrHands(tempOcrHands);
    captureStream.getTracks().forEach((track) => track.stop());
  };

  useEffect(() => {
    firebase.initializeApp(config);
    const initiateLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideoRef1.current) {
          localVideoRef1.current.srcObject = stream.clone();
        }
        if (localVideoRef2.current) {
          localVideoRef2.current.srcObject = stream.clone();
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
    capture();
  }, []);

  const startCallHelper = async (username, userToCall) => {
    listenToConnectionEvents(
      localConnection,
      username,
      userToCall,
      database,
      remoteVideoRef1,
      remoteVideoRef2,
      doCandidate
    );
    createOffer(
      localConnection,
      localStreamRef.current,
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
          setHost(notif.from);
          listenToConnectionEvents(
            localConnection,
            username,
            notif.from,
            database,
            remoteVideoRef1,
            remoteVideoRef2,
            doCandidate
          );
          sendAnswer(
            localConnection,
            localStreamRef.current,
            notif,
            doAnswer,
            database,
            username
          );
          break;
        case "answer":
          setConnectedUser(notif.from);
          setHost(username);
          startCall(localConnection, notif);
          break;
        case "candidate":
          addCandidate(localConnection, notif);
          break;
        case "lockedBy":
          setLockedBy(notif.lockedBy);
          break;
        case "reality":
          notif.reality ? realityOn() : realityOff();
          break;
        case "mode":
          setMode(notif.mode);
          break;
        case "assignTo":
          setAssignTo(notif.assignTo);
          break;
        case "typedSuit":
          setTypedSuit(notif.typedSuit);
          break;
        case "typedRank":
          setTypedRank(notif.typedRank);
          break;
        default:
          break;
      }
    }
  };

  const [controlView, setControlView] = useState(null);

  useEffect(() => {
    setControlView(window.open());
  }, []);

  useEffect(() => {
    if (controlView?.document?.body) {
      copyStyles(document, controlView.document);
    }
  }, [controlView?.document]);

  const controlViewWindow = useMemo(() => {
    if (controlView?.document?.body) {
      return ReactDOM.createPortal(
        <Control
          controlView={controlView}
          videoChatContainer={
            <VideoChat
              startCall={startCallHelper}
              onLogin={onLogin}
              localVideoRef1={localVideoRef1}
              localVideoRef2={localVideoRef2}
              remoteVideoRef1={remoteVideoRef1}
              remoteVideoRef2={remoteVideoRef2}
              editable={true}
            />
          }
          database={database}
        />,
        controlView.document.body
      );
    } else return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlView]);

  return (
    <>
      <View
        editable={false}
        videoChatContainer={
          <VideoChat
            startCall={startCallHelper}
            onLogin={onLogin}
            localVideoRef1={localVideoRef1}
            localVideoRef2={localVideoRef2}
            remoteVideoRef1={remoteVideoRef1}
            remoteVideoRef2={remoteVideoRef2}
            editable={false}
          />
        }
      />
      {controlViewWindow}
    </>
  );
}

export default App;

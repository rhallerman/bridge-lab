import React, { useState, useEffect, useMemo, useRef } from "react";
import "./App.css";
import Control from "./Control/Control";
import ReactDOM from "react-dom";
import View from "./View/View";
import "firebase/compat/database";
import firebase from "firebase/compat/app";
import config from "./View/config";
import {
  addCandidate,
  createOffer,
  listenToConnectionEvents,
  sendAnswer,
} from "./View/RTCModule";
import "webrtc-adapter";
import { doAnswer, doCandidate, doLogin, doOffer } from "./View/FirebaseModule";

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

const App = () => {
  const [controlView, setControlView] = useState(null);

  useEffect(() => {
    setControlView(window.open());
  }, []);

  useEffect(() => {
    if (controlView?.document?.body) {
      copyStyles(document, controlView.document);
    }
  }, [controlView?.document]);

  const [database, setDatabase] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [localConnection, setLocalConnection] = useState(null);
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
          setLocalStream(stream);
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
          console.log(`offer from ${notif.from}`);
          setConnectedUser(notif.from);
          listenToConnectionEvents(
            localConnection,
            username,
            notif.from,
            database,
            remoteVideoRef,
            doCandidate
          );
          console.log("listenToConnectionEvents done");
          sendAnswer(
            localConnection,
            localStream,
            notif,
            doAnswer,
            database,
            username
          );
          console.log("sendAnswer done");
          break;
        case "answer":
          console.log(`answer from ${notif.from}`);
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
    console.log("listenToConnectionEvents done");
    createOffer(
      localConnection,
      localStream,
      userToCall,
      doOffer,
      database,
      username
    );
    console.log("createOffer done");
  };

  const onLogin = async (username) => {
    await doLogin(username, database, handleUpdate);
  };

  const controlViewWindow = useMemo(() => {
    if (controlView?.document?.body) {
      return ReactDOM.createPortal(
        <Control
          controlView={controlView}
          localStream={localStream}
          startCall={startCall}
          onLogin={onLogin}
          setLocalVideoRef={setLocalVideoRef}
          setRemoteVideoRef={setRemoteVideoRef}
          connectedUser={connectedUser}
        />,
        controlView.document.body
      );
    } else return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlView, localStream, connectedUser]);

  return (
    <>
      <View
        localStream={localStream}
        startCall={startCall}
        onLogin={onLogin}
        setLocalVideoRef={setLocalVideoRef}
        setRemoteVideoRef={setRemoteVideoRef}
        connectedUser={connectedUser}
      />
      {controlViewWindow}
    </>
  );
};

export default App;

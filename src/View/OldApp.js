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
import VideoChatContainer from "./View/VideoChatContainer";

// function copyStyles(sourceDoc, targetDoc) {
//   Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
//     if (styleSheet.cssRules) {
//       // for <style> elements
//       const newStyleEl = sourceDoc.createElement("style");

//       Array.from(styleSheet.cssRules).forEach((cssRule) => {
//         // write the text of each rule into the body of the style element
//         newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
//       });

//       targetDoc.head.appendChild(newStyleEl);
//     } else if (styleSheet.href) {
//       // for <link> elements loading CSS from a URL
//       const newLinkEl = sourceDoc.createElement("link");

//       newLinkEl.rel = "stylesheet";
//       newLinkEl.href = styleSheet.href;
//       targetDoc.head.appendChild(newLinkEl);
//     }
//   });
// }

const App = () => {
  // const [controlView, setControlView] = useState(null);

  // useEffect(() => {
  //   setControlView(window.open());
  // }, []);

  // useEffect(() => {
  //   if (controlView?.document?.body) {
  //     copyStyles(document, controlView.document);
  //   }
  // }, [controlView?.document]);

  const [database, setDatabase] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [localConnection, setLocalConnection] = useState(null);
  const [connectedUser, setConnectedUser] = useState(null);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

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

  // const controlViewWindow = useMemo(() => {
  //   if (controlView?.document?.body) {
  //     return ReactDOM.createPortal(
  //       <Control
  //         controlView={controlView}
  //         localStream={localStream}
  //         startCall={startCall}
  //         onLogin={onLogin}
  //         setLocalVideoRef={setLocalVideoRef}
  //         setRemoteVideoRef={setRemoteVideoRef}
  //         connectedUser={connectedUser}
  //       />,
  //       controlView.document.body
  //     );
  //   } else return null;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [controlView, localStream, connectedUser]);

  return (
    // <>
    //   <View
    //     localStream={localStream}
    //     startCall={startCall}
    //     onLogin={onLogin}
    //     setLocalVideoRef={setLocalVideoRef}
    //     setRemoteVideoRef={setRemoteVideoRef}
    //     connectedUser={connectedUser}
    //   />
    //   {controlViewWindow}
    // </>
    <div className="app">
      <h1>React Video Chat App</h1>
      <h2>WebRTC + Firebase</h2>
      <VideoChatContainer />
    </div>
  );
};

export default App;

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
  const [kibView, setKibView] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const localStreamRef = useRef();
  localStreamRef.current = localStream;

  const localVideoRef1 = useRef(null);
  const localVideoRef2 = useRef(null);
  const remoteVideoRef1 = useRef(null);
  const remoteVideoRef2 = useRef(null);

  /*
   * Create form to request access token from Google's OAuth 2.0 server.
   */
  const oauthSignIn = () => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement("form");
    form.setAttribute("method", "GET"); // Send as a GET request.
    form.setAttribute("action", oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      client_id:
        "69484809608-tes2e82m3ebcmehh8f5m1dm0cklv0n1l.apps.googleusercontent.com",
      redirect_uri: "https://rhallerman.github.io/kib-sync/",
      response_type: "token",
      scope:
        "https://www.googleapis.com/auth/cloud-vision https://www.googleapis.com/auth/cloud-platform",
      state: "pass-through value",
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  };

  const getUrlParameter = (sParam) => {
    const sPageURL = window.location.href.substring(1);
    const sURLVariables = sPageURL.split("&");
    for (let i = 0; i < sURLVariables.length; i++) {
      const sParameterName = sURLVariables[i].split("=");
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  };

  useEffect(() => {
    if (window.location.href.length === 22) {
      oauthSignIn();
    } else {
      setAccessToken(getUrlParameter("access_token"));
      setKibView(window.open());
    }
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

  useEffect(() => {
    if (kibView?.document?.body) {
      copyStyles(document, kibView.document);
    }
  }, [kibView?.document]);

  const kibViewWindow = useMemo(() => {
    if (kibView?.document?.body) {
      return ReactDOM.createPortal(
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
        />,
        kibView.document.body
      );
    } else return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kibView]);

  return (
    <>
      <Control
        kibView={kibView}
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
        accessToken={accessToken}
      />
      {kibViewWindow}
    </>
  );
}

export default App;

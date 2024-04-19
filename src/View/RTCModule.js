export const createOffer = async (
  connection,
  localStream,
  userToCall,
  doOffer,
  database,
  username
) => {
  try {
    localStream.getTracks().forEach((track) => {
      connection.addTrack(track, localStream);
    });
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    doOffer(userToCall, offer, database, username);
  } catch (exception) {
    console.error(exception);
  }
};

export const initiateLocalStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    return stream;
  } catch (exception) {
    console.error(exception);
  }
};

export const initiateConnection = async () => {
  try {
    var configuration = {
      iceServers: [{ urls: "stun:stun2.1.google.com:19302" }],
    };
    const conn = new RTCPeerConnection(configuration);
    return conn;
  } catch (exception) {
    console.error(exception);
  }
};

export const listenToConnectionEvents = (
  conn,
  username,
  remoteUsername,
  database,
  remoteVideoRef1,
  remoteVideoRef2,
  doCandidate
) => {
  conn.onicecandidate = function (event) {
    if (event.candidate) {
      doCandidate(remoteUsername, event.candidate, database, username);
    }
  };
  conn.ontrack = function (e) {
    const stream = e.streams[0];
    if (remoteVideoRef1.current) {
      remoteVideoRef1.current.srcObject = stream.clone();
    }
    if (remoteVideoRef2.current) {
      remoteVideoRef2.current.srcObject = stream.clone();
    }
  };
};

export const sendAnswer = async (
  conn,
  localStream,
  notif,
  doAnswer,
  database,
  username
) => {
  try {
    localStream.getTracks().forEach((track) => {
      conn.addTrack(track, localStream);
    });
    const offer = JSON.parse(notif.offer);
    conn.setRemoteDescription(offer);
    const answer = await conn.createAnswer();
    conn.setLocalDescription(answer);
    doAnswer(notif.from, answer, database, username);
  } catch (exception) {
    console.error(exception);
  }
};

export const startCall = (yourConn, notif) => {
  const answer = JSON.parse(notif.answer);
  yourConn.setRemoteDescription(answer);
};

export const addCandidate = (yourConn, notif) => {
  const candidate = JSON.parse(notif.candidate);
  yourConn.addIceCandidate(new RTCIceCandidate(candidate));
};

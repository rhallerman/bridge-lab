export const createOffer = async (
  connection,
  localStream,
  userToCall,
  doOffer,
  database,
  username
) => {
  try {
    localStream
      .getTracks()
      .forEach((track) => connection.addTrack(track, localStream));
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    doOffer(userToCall, offer, database, username);
  } catch (exception) {
    console.error(exception);
  }
};

export const listenToConnectionEvents = (
  conn,
  username,
  remoteUsername,
  database,
  remoteVideoRef,
  doCandidate
) => {
  conn.onicecandidate = (event) => {
    if (event.candidate) {
      doCandidate(remoteUsername, event.candidate, database, username);
    }
  };
  conn.ontrack = (event) => {
    if (remoteVideoRef.srcObject !== event.streams[0]) {
      remoteVideoRef.srcObject = event.streams[0];
    }
  };
};

export const sendAnswer = async (
  connection,
  localStream,
  notif,
  doAnswer,
  database,
  username
) => {
  try {
    console.log("sendAnswer");
    console.log(JSON.parse(notif.offer));
    const offer = JSON.parse(notif.offer);
    connection.setRemoteDescription(offer);
    console.log("set remote description");
    localStream
      .getTracks()
      .forEach((track) => connection.addTrack(track, localStream));
    console.log("added track");
    const answer = await connection.createAnswer();
    console.log("created answer");
    console.log(answer);
    connection.setLocalDescription(answer);
    console.log("set local description");
    doAnswer(notif.from, answer, database, username);
  } catch (exception) {
    console.error(exception);
  }
};

export const startCall = (conn, notif) => {
  const answer = JSON.parse(notif.answer);
  conn.setRemoteDescription(answer);
};

export const addCandidate = (conn, notif) => {
  const candidate = JSON.parse(notif.candidate);
  conn.addIceCandidate(new RTCIceCandidate(candidate));
};

export const createOffer = async (
  connection,
  localStream,
  userToCall,
  doOffer,
  database,
  username
) => {
  try {
    console.log("createOffer");
    console.log(localStream);
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
    localStream
      .getTracks()
      .forEach((track) => connection.addTrack(track, localStream));
    const offer = JSON.parse(notif.offer);
    connection.setRemoteDescription(offer);
    const answer = await connection.createAnswer();
    connection.setLocalDescription(answer);
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

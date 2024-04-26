export const doLogin = async (username, database, handleUpdate) => {
  await database.ref("/notifs/" + username).remove();
  database.ref("/notifs/" + username).on("value", (snapshot) => {
    snapshot.exists() && handleUpdate(snapshot.val(), username);
  });
};

export const doOffer = async (to, offer, database, username) => {
  await database.ref("/notifs/" + to).set({
    type: "offer",
    from: username,
    offer: JSON.stringify(offer),
  });
};

export const doAnswer = async (to, answer, database, username) => {
  await database.ref("/notifs/" + to).update({
    type: "answer",
    from: username,
    answer: JSON.stringify(answer),
  });
};

export const doCandidate = async (to, candidate, database, username) => {
  await database.ref("/notifs/" + to).update({
    type: "candidate",
    from: username,
    candidate: JSON.stringify(candidate),
  });
};

export const setDBLockedBy = async (to, database, username, lockedBy) => {
  await database.ref("/notifs/" + to).update({
    type: "lockedBy",
    from: username,
    lockedBy: lockedBy,
  });
};

export const setDBReality = async (to, database, username, reality) => {
  await database.ref("/notifs/" + to).update({
    type: "reality",
    from: username,
    reality: reality,
  });
};

export const setDBMode = async (to, database, username, mode) => {
  await database.ref("/notifs/" + to).update({
    type: "mode",
    from: username,
    mode: mode,
  });
};

export const setDBAssignTo = async (to, database, username, assignTo) => {
  await database.ref("/notifs/" + to).update({
    type: "assignTo",
    from: username,
    assignTo: assignTo,
  });
};

export const setDBTypedSuit = async (to, database, username, typedSuit) => {
  await database.ref("/notifs/" + to).update({
    type: "typedSuit",
    from: username,
    typedSuit: typedSuit,
  });
};

export const setDBTypedRank = async (to, database, username, typedRank) => {
  await database.ref("/notifs/" + to).update({
    type: "typedRank",
    from: username,
    typedRank: typedRank,
  });
};

import React, { useContext, useEffect } from "react";
import "./Control.css";
import "../View/View.css";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  Tooltip,
} from "@mui/material";
import { Context } from "../Context/Context";
import View from "../View/View";
import input from "../Input/Input.json";
import {
  setDBReality,
  setDBMode,
  setDBAssignTo,
  setDBTypedSuit,
  setDBTypedRank,
  setDBLockedBy,
} from "../View/FirebaseModule";

const Control = ({ controlView, videoChatContainer, database }) => {
  let {
    hands,
    handsDup,
    playedCards,
    reality,
    mode,
    setMode,
    assignTo,
    setAssignTo,
    history,
    typedSuit,
    setTypedSuit,
    typedRank,
    setTypedRank,
    broadcastType,
    setBroadcastType,
    showPlayedCards,
    setShowPlayedCards,
    auction,
    liveEvents,
    realityOn,
    realityOff,
    back,
    forward,
    play,
    assign,
    unassign,
    trade,
    shape,
    setShape,
    username,
    connectedUser,
    lockedBy,
    setLockedBy,
  } = useContext(Context);

  const broadcastTypeGroup = (
    <FormControl className="radioGroupHeader">
      <FormLabel>Broadcast type:</FormLabel>
      <RadioGroup
        row
        value={broadcastType}
        onChange={(event) => setBroadcastType(event.target.value)}
      >
        <Tooltip
          title={
            <div className="tooltip">
              The event will continue to play live during analysis.
            </div>
          }
          enterTouchDelay={0}
        >
          <FormControlLabel
            value="stream"
            control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
            label="Stream"
            sx={{ marginLeft: "0px" }}
          />
        </Tooltip>
        <Tooltip
          title={
            <div className="tooltip">The event will pause during analysis.</div>
          }
          enterTouchDelay={0}
        >
          <FormControlLabel
            value="video"
            control={
              <Radio
                disabled={true}
                sx={{ paddingTop: "0px", paddingBottom: "0px" }}
              />
            }
            label="Video"
            sx={{ marginLeft: "0px" }}
          />
        </Tooltip>
      </RadioGroup>
    </FormControl>
  );

  const lockedBySwitch = (
    <FormControlLabel
      control={
        <Switch
          checked={!!lockedBy}
          onChange={(event) => {
            if (event.target.checked) {
              if (connectedUser)
                setDBLockedBy(connectedUser, database, username, username);
              setLockedBy(username);
            } else {
              if (connectedUser)
                setDBLockedBy(connectedUser, database, username, null);
              setLockedBy(null);
            }
          }}
        />
      }
      label={
        lockedBy ? (
          `Locked by ${lockedBy}`
        ) : (
          <>
            <u>L</u>ock
          </>
        )
      }
      disabled={lockedBy && lockedBy !== username}
    />
  );

  const analysisSwitch = (
    <FormControlLabel
      control={
        <Switch
          checked={!reality}
          onChange={(event) => {
            console.log(event.target.checked);
            if (event.target.checked) {
              if (connectedUser) {
                setDBLockedBy(connectedUser, database, username, username);
                setDBReality(connectedUser, database, username, false);
              }
              setLockedBy(username);
              realityOff();
            } else {
              if (connectedUser) {
                setDBReality(connectedUser, database, username, true);
              }
              realityOn();
            }
          }}
        />
      }
      label={
        <>
          Analysis Mode (<u> </u>)
        </>
      }
      disabled={lockedBy && lockedBy !== username}
    />
  );

  const showPlayedCardsSwitch = (
    <FormControlLabel
      control={
        <Switch
          checked={showPlayedCards}
          onChange={(event) => setShowPlayedCards(event.target.checked)}
          disabled={reality}
        />
      }
      label="Show played cards"
      disabled={lockedBy && lockedBy !== username}
    />
  );

  const modeGroup = (
    <FormControl
      disabled={reality || (lockedBy && lockedBy !== username)}
      className="radioGroupHeader"
    >
      <FormLabel>Mode:</FormLabel>
      <RadioGroup
        value={mode}
        onChange={(event) => {
          if (connectedUser)
            setDBMode(connectedUser, database, username, event.target.value);
          setMode(event.target.value);
        }}
      >
        <FormControlLabel
          value="play"
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>P</u>lay
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value="assign"
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>A</u>ssign
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value="unassign"
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>U</u>nassign
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value="trade"
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>T</u>rade
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value="shape"
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              Shape (<u>x</u>)
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
      </RadioGroup>
    </FormControl>
  );

  const assignToGroup = (
    <FormControl
      disabled={reality || (lockedBy && lockedBy !== username)}
      className="radioGroupHeader"
    >
      <FormLabel>Player:</FormLabel>
      <RadioGroup
        value={assignTo}
        onChange={(event) => {
          if (connectedUser)
            setDBAssignTo(
              connectedUser,
              database,
              username,
              event.target.value
            );
          setAssignTo(event.target.value);
        }}
      >
        <FormControlLabel
          value={0}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>N</u>orth
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value={1}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>E</u>ast
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value={2}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>S</u>outh
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value={3}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>W</u>est
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
      </RadioGroup>
    </FormControl>
  );

  const suitGroup = (
    <FormControl
      disabled={reality || (lockedBy && lockedBy !== username)}
      className="radioGroupHeader"
    >
      <FormLabel>Suit:</FormLabel>
      <RadioGroup
        value={typedSuit}
        onChange={(event) => {
          if (connectedUser)
            setDBTypedSuit(
              connectedUser,
              database,
              username,
              event.target.value
            );
          setTypedSuit(event.target.value);
        }}
      >
        <FormControlLabel
          value={0}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>s</u>pade
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value={1}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>h</u>eart
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value={2}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>d</u>iamond
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
        <FormControlLabel
          value={3}
          control={<Radio sx={{ paddingTop: "0px", paddingBottom: "0px" }} />}
          label={
            <>
              <u>c</u>lub
            </>
          }
          sx={{ marginLeft: "0px" }}
        />
      </RadioGroup>
    </FormControl>
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "BODY") {
        if (e.key === "ArrowRight") {
          if (!reality && liveEvents.length < input.events.length) {
            forward();
          }
        } else if (e.key === "ArrowLeft") {
          if (!reality) {
            back();
          }
        } else if (e.key === " ") {
          reality ? realityOff() : realityOn();
        } else if (e.key === "P") {
          if (!reality) setMode("play");
        } else if (e.key === "A") {
          if (!reality) setMode("assign");
        } else if (e.key === "U") {
          if (!reality) setMode("unassign");
        } else if (e.key === "T") {
          if (!reality) setMode("trade");
        } else if (e.key === "x") {
          if (!reality) setMode("shape");
        } else if (e.key === "N") {
          if (["assign", "shape"].includes(mode)) {
            setAssignTo(0);
            if (connectedUser)
              setDBAssignTo(connectedUser, database, username, 0);
          }
        } else if (e.key === "S") {
          if (["assign", "shape"].includes(mode)) {
            setAssignTo(2);
            if (connectedUser)
              setDBAssignTo(connectedUser, database, username, 2);
          }
        } else if (e.key === "W") {
          if (["assign", "shape"].includes(mode)) {
            setAssignTo(3);
            if (connectedUser)
              setDBAssignTo(connectedUser, database, username, 3);
          }
        } else if (e.key === "E") {
          if (["assign", "shape"].includes(mode)) {
            setAssignTo(1);
            if (connectedUser)
              setDBAssignTo(connectedUser, database, username, 1);
          }
        } else if (e.key === "s") {
          setTypedSuit(0);
          if (connectedUser)
            setDBTypedSuit(connectedUser, database, username, 0);
        } else if (e.key === "h") {
          setTypedSuit(1);
          if (connectedUser)
            setDBTypedSuit(connectedUser, database, username, 1);
        } else if (e.key === "d") {
          setTypedSuit(2);
          if (connectedUser)
            setDBTypedSuit(connectedUser, database, username, 2);
        } else if (e.key === "c") {
          setTypedSuit(3);
          if (connectedUser)
            setDBTypedSuit(connectedUser, database, username, 3);
        } else if (e.key === "a") {
          if (typedSuit !== null) {
            setTypedRank(0);
            if (connectedUser)
              setDBTypedRank(connectedUser, database, username, 0);
          }
        } else if (e.key === "k") {
          if (typedSuit !== null) {
            setTypedRank(1);
            if (connectedUser)
              setDBTypedRank(connectedUser, database, username, 1);
          }
        } else if (e.key === "q") {
          if (typedSuit !== null) {
            setTypedRank(2);
            if (connectedUser)
              setDBTypedRank(connectedUser, database, username, 2);
          }
        } else if (e.key === "j") {
          if (typedSuit !== null) {
            setTypedRank(3);
            if (connectedUser)
              setDBTypedRank(connectedUser, database, username, 3);
          }
        } else if (e.key === "t") {
          if (typedSuit !== null) {
            setTypedRank(4);
            if (connectedUser)
              setDBTypedRank(connectedUser, database, username, 4);
          }
        } else if (e.keyCode >= 48 && e.keyCode <= 57) {
          if (
            ["play", "assign", "unassign", "trade"].includes(mode) &&
            e.keyCode >= 50 &&
            e.keyCode <= 57
          ) {
            // 2 - 9
            if (typedSuit !== null) {
              setTypedRank(62 - e.keyCode);
              if (connectedUser)
                setDBTypedRank(
                  connectedUser,
                  database,
                  username,
                  62 - e.keyCode
                );
            }
          } else if (mode === "shape") {
            setShape([...shape, parseInt(e.key)]);
          }
          /*
        A = 0
        K = 1
        Q = 2
        J = 3
        T = 4
        9 = 5
        8 = 6
        7 = 7
        6 = 8
        5 = 9
        4 = 10
        3 = 11
        2 = 12
        */
        } else {
          // console.log(e.key);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    if (controlView?.document) {
      controlView.document.addEventListener("keydown", handleKeyDown);
    }
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
      if (controlView?.document)
        controlView.document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hands,
    playedCards,
    history,
    reality,
    mode,
    assignTo,
    typedSuit,
    typedRank,
    auction,
    liveEvents,
    shape,
  ]);

  useEffect(() => {
    if (typedSuit !== null && typedRank !== null) {
      const card = { suit: typedSuit, rank: typedRank };
      if (mode === "assign") {
        assign(card);
      } else {
        const hand = handsDup.findIndex((hand) =>
          hand.some(
            (card) => card.suit === typedSuit && card.rank === typedRank
          )
        );
        if (hand >= 0) {
          card.hand = hand;
          if (mode === "play") {
            play(card, false);
          } else if (mode === "unassign") {
            unassign(card);
          } else if (mode === "trade") {
            trade(card);
          }
        }
      }
      setTypedRank(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedSuit, typedRank, assignTo]);

  // const [file, setFile] = useState(null);

  // useEffect(() => {
  //   if (file)
  //     fetch("https://content.dropboxapi.com/2/files/upload", {
  //       method: "POST",
  //       headers: {
  //         Authorization:
  //           "Bearer sl.BzfwH5pceWZeKGn1dSpTWOKEc0FWT72cz1PjKd-SkVMzcqO8DfGsm3ZtKQVssUk1DxVwjFY1bhwWQvX7ox59PO_Zv7kxaMXCyNp0S8VjiHc4yyGYXQxMyPOcqhRxK4_v4MZAXWZjp9cU",
  //         "Dropbox-API-Arg": `{"autorename":false,"mode":"add","mute":false,"path":"/${file.name}","strict_conflict":false}`,
  //         "Content-Type": "application/octet-stream",
  //       },
  //       body: file,
  //     });
  // }, [file]);

  // const handleFile = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const uploadButton = <input type="file" onChange={handleFile} />;

  return (
    <div className="viewAndControls">
      <View editable={true} videoChatContainer={videoChatContainer} />
      {/* {renderHand(
        unassignedCards,
        undefined,
        undefined,
        "assignCard",
        () => mode !== "assign",
        (card) => assign(card),
        tradeCard
      )} */}
      <div className="controls">
        {broadcastTypeGroup}
        {lockedBySwitch}
        {analysisSwitch}
        {showPlayedCardsSwitch}
        <div className="row">{modeGroup}</div>
        <div className="row">
          {assignToGroup}
          {suitGroup}
        </div>
        {/* {uploadButton} */}
      </div>
    </div>
  );
};

export default Control;

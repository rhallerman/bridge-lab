import React, { useContext, useEffect, useState } from "react";
import "./Control.css";
import "../View/View.css";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import { Context } from "../Context/Context";
import View from "../View/View";
import input from "../Input/Input.json";
// import { play } from "./Play";
import { trade } from "./Trade";

const Control = ({ controlView }) => {
  let context = useContext(Context);
  let {
    hands,
    playedCards,
    reality,
    mode,
    setMode,
    assignTo,
    setAssignTo,
    tradeCard,
    setTradeCard,
    history,
    setHistory,
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
    assign,
    unassign,
  } = context;

  const broadcastTypeGroup = (
    <FormControl>
      <FormLabel>Broadcast type:</FormLabel>
      <RadioGroup
        row
        value={broadcastType}
        onChange={(event) => setBroadcastType(event.target.value)}
      >
        <FormControlLabel value="stream" control={<Radio />} label="Stream" />
        <FormControlLabel
          value="video"
          control={<Radio disabled={true} />}
          label="Video"
        />
      </RadioGroup>
    </FormControl>
  );

  const analysisSwitch = (
    <FormControlLabel
      control={
        <Switch
          checked={!reality}
          onChange={() => (reality ? realityOff() : realityOn())}
        />
      }
      label="Analysis mode (_)"
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
    />
  );

  const modeGroup = (
    <FormControl disabled={reality}>
      <FormLabel>Mode:</FormLabel>
      <RadioGroup
        value={mode}
        onChange={(event) => setMode(event.target.value)}
      >
        <FormControlLabel
          value="play"
          control={<Radio />}
          label={
            <>
              <u>P</u>lay
            </>
          }
        />
        <FormControlLabel
          value="assign"
          control={<Radio />}
          label={
            <>
              <u>A</u>ssign
            </>
          }
        />
        <FormControlLabel
          value="unassign"
          control={<Radio />}
          label={
            <>
              <u>U</u>nassign
            </>
          }
        />
        <FormControlLabel
          value="trade"
          control={<Radio />}
          label={
            <>
              <u>T</u>rade
            </>
          }
        />
      </RadioGroup>
    </FormControl>
  );

  const assignToGroup = (
    <FormControl disabled={reality}>
      <FormLabel>Player:</FormLabel>
      <RadioGroup
        value={assignTo}
        onChange={(event) => setAssignTo(event.target.value)}
      >
        <FormControlLabel
          value={0}
          control={<Radio />}
          label={
            <>
              <u>N</u>orth
            </>
          }
        />
        <FormControlLabel
          value={1}
          control={<Radio />}
          label={
            <>
              <u>E</u>ast
            </>
          }
        />
        <FormControlLabel
          value={2}
          control={<Radio />}
          label={
            <>
              <u>S</u>outh
            </>
          }
        />
        <FormControlLabel
          value={3}
          control={<Radio />}
          label={
            <>
              <u>W</u>est
            </>
          }
        />
      </RadioGroup>
    </FormControl>
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
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
      } else if (e.key === "A") {
        if (!reality) setMode("assign");
      } else if (e.key === "U") {
        if (!reality) setMode("unassign");
      } else if (e.key === "T") {
        if (!reality) setMode("trade");
      } else if (e.key === "N") {
        if (mode === "assign") setAssignTo(0);
      } else if (e.key === "S") {
        if (mode === "assign") setAssignTo(2);
      } else if (e.key === "W") {
        if (mode === "assign") setAssignTo(3);
      } else if (e.key === "E") {
        if (mode === "assign") setAssignTo(1);
      } else if (e.key === "s") {
        setTypedSuit(0);
      } else if (e.key === "h") {
        setTypedSuit(1);
      } else if (e.key === "d") {
        setTypedSuit(2);
      } else if (e.key === "c") {
        setTypedSuit(3);
      } else if (e.key === "a") {
        if (typedSuit !== null) setTypedRank(0);
      } else if (e.key === "k") {
        if (typedSuit !== null) setTypedRank(1);
      } else if (e.key === "q") {
        if (typedSuit !== null) setTypedRank(2);
      } else if (e.key === "j") {
        if (typedSuit !== null) setTypedRank(3);
      } else if (e.key === "t") {
        if (typedSuit !== null) setTypedRank(4);
      } else if (e.keyCode >= 50 && e.keyCode <= 57) {
        // 2 - 9
        if (typedSuit !== null) setTypedRank(62 - e.keyCode);
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
        console.log(e.key);
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
  ]);

  useEffect(() => {
    if (typedSuit !== null && typedRank !== null) {
      const card = { suit: typedSuit, rank: typedRank };
      if (mode === "assign") {
        assign(card);
      } else {
        const hand = hands.findIndex((hand) =>
          hand.some(
            (card) => card.suit === typedSuit && card.rank === typedRank
          )
        );
        card.hand = hand;
        if (mode === "unassign") {
          unassign(card);
        } else if (mode === "trade") {
          trade(card, hands, tradeCard, setTradeCard, history, setHistory);
        }
      }
      setTypedSuit(null);
      setTypedRank(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedSuit, typedRank, assignTo]);

  // const [file, setFile] = useState(null);

  // useEffect(() => {
  //   if (file !== null) {
  //     console.log(file);
  //     const cloudName = "dpm9xofa3";
  //     const unsignedUploadPreset = "xzbzngn1";

  //     const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  //     const fd = new FormData();
  //     fd.append("upload_preset", unsignedUploadPreset);
  //     fd.append("file", file);
  //     fd.append("public_id", "bidding.txt");
  //     console.log(file);

  //     fetch(url, {
  //       method: "POST",
  //       body: fd,
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // File uploaded successfully
  //         console.log("upload successful");
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error uploading the file:", error);
  //       });
  //   }
  // }, [file]);

  // const handleFile = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const uploadButton = <input type="file" onChange={handleFile} />;

  return (
    <div className="viewAndControls">
      <View editable={true} />
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
        {analysisSwitch}
        {showPlayedCardsSwitch}
        <div className="row">
          {modeGroup}
          {assignToGroup}
        </div>
        {/* {uploadButton} */}
      </div>
    </div>
  );
};

export default Control;

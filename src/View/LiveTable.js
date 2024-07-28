import React, { useContext } from "react";
import { Context } from "../Context/Context";

const LiveTable = ({ editable }) => {
  const context = useContext(Context);
  const {
    vul,
    contractLevel,
    contractSuit,
    contractDbl,
    declarer,
    trickCards,
    reality,
    suitChars,
    renderCard,
    renderHand,
    directionToStr,
    northName,
    setNorthName,
    eastName,
    setEastName,
    southName,
    setSouthName,
    westName,
    setWestName,
  } = context;

  const liveStatus = (
    <span className="liveIconAndStatus">
      <div className="liveIcon">•</div>
      <div className="liveStatus">LIVE</div>
    </span>
  );

  const contract = (
    <div className="contractAndDirection">
      <div className="contractBorder">
        <div className="contract">{contractLevel}</div>
        <div className={`${contractSuit >= 0 ? `suit${contractSuit}` : ""}`}>
          {suitChars[contractSuit]}
        </div>
        <div>{"X".repeat(contractDbl)}</div>
        <div>{directionToStr(declarer)?.substring(0, 1) ?? ""}</div>
      </div>
    </div>
  );

  const cardsOnTable = Array.from(trickCards).map((card) =>
    renderCard(
      card,
      `card trickOnTable trickOnTable${card.hand}`,
      false,
      () => {},
      true
    )
  );

  const table = (
    <div className="table">
      <div className="nsVuls">
        <div
          className={`northTrapezoid ${
            [1, 3].includes(vul) ? "northRed" : "northWhite"
          }`}
        ></div>
        <div
          className={`southTrapezoid ${
            [1, 3].includes(vul) ? "southRed" : "southWhite"
          }`}
        ></div>
      </div>
      <div className="ewVuls">
        <div
          className={`westTrapezoid ${
            [2, 3].includes(vul) ? "westRed" : "westWhite"
          }`}
        ></div>
        <div
          className={`eastTrapezoid ${
            [2, 3].includes(vul) ? "eastRed" : "eastWhite"
          }`}
        ></div>
      </div>
      {cardsOnTable}
    </div>
  );

  const northHand = renderHand(
    0,
    northName,
    setNorthName,
    "card",
    true,
    () => {},
    false,
    editable && reality
  );

  const southHand = renderHand(
    2,
    southName,
    setSouthName,
    "card",
    true,
    () => {},
    false,
    editable && reality
  );

  const eastHand = renderHand(
    1,
    eastName,
    setEastName,
    "card",
    true,
    () => {},
    false,
    editable && reality
  );

  const westHand = renderHand(
    3,
    westName,
    setWestName,
    "card",
    true,
    () => {},
    false,
    editable && reality
  );

  const playArea = (
    <div
      className={`playArea animate main ${
        !reality ? "side" : ""
      } disabledCursor`}
    >
      {liveStatus}
      {contractLevel !== null && contract}
      <div className="board">
        {table}
        {northHand}
        {southHand}
        {eastHand}
        {westHand}
      </div>
    </div>
  );

  return playArea;
};

export default LiveTable;

import React, { useContext } from "react";
import { Context } from "../Context/Context";

const AnalysisTable = ({ editable }) => {
  const {
    trickCardsDup,
    reality,
    mode,
    play,
    renderCard,
    renderHand,
    unassign,
    trade,
    vul,
    northName,
    setNorthName,
    eastName,
    setEastName,
    southName,
    setSouthName,
    westName,
    setWestName,
    contractLevel,
    contractSuit,
    contractDbl,
    declarer,
    suitChars,
    directionToStr,
  } = useContext(Context);

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

  const cardsOnTable = Array.from(trickCardsDup).map((card, cardIdx) => (
    <div key={cardIdx}>
      {renderCard(
        card,
        `card trickOnTable trickOnTable${card.hand}`,
        false,
        () => {},
        true
      )}
    </div>
  ));

  const table = (
    <div className="table" key="table">
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

  const handleCardClicked = (card) => {
    if (mode === "play") {
      play(card, false);
    } else if (mode === "assign") {
      // TODO
      console.log("Clicking a card has no effect when in Assign mode.");
    } else if (mode === "unassign") {
      unassign(card);
    } else if (mode === "trade") {
      trade(card);
    }
  };

  const northHand = renderHand(
    0,
    northName,
    setNorthName,
    "card",
    false,
    handleCardClicked,
    true,
    editable
  );

  const southHand = renderHand(
    2,
    southName,
    setSouthName,
    "card",
    false,
    handleCardClicked,
    true,
    editable
  );

  const eastHand = renderHand(
    1,
    eastName,
    setEastName,
    "card",
    false,
    handleCardClicked,
    true,
    editable
  );

  const westHand = renderHand(
    3,
    westName,
    setWestName,
    "card",
    false,
    handleCardClicked,
    true,
    editable
  );

  return (
    <div
      className={`playArea animate offAnalysis ${
        !reality ? "onAnalysis" : ""
      } enabledCursor`}
      key="playArea analysis"
    >
      {contract}
      <div className="board">
        {table}
        {northHand}
        {southHand}
        {eastHand}
        {westHand}
      </div>
    </div>
  );
};

export default AnalysisTable;

import React, { useContext } from "react";
import { Context } from "../Context/Context";

const LiveTable = () => {
  const context = useContext(Context);
  const {
    vul,
    contractLevel,
    contractSuit,
    declarer,
    trickCards,
    reality,
    auctionEnded,
    suitChars,
    renderCard,
    renderHand,
  } = context;

  const liveStatus = (
    <span className="liveIconAndStatus">
      <div className="liveIcon">•</div>
      <div className="liveStatus">LIVE</div>
    </span>
  );

  const contract = (
    <div className="contractAndDirection">
      <div className="contract">{contractLevel}</div>
      <div className="suit3">{suitChars[contractSuit]}</div>
      <div className="direction">{declarer}</div>
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

  const northHand = renderHand(0, "Kalita", "card", true, () => {}, false);

  const southHand = renderHand(2, "Klukowski", "card", true, () => {}, false);

  const eastHand = renderHand(1, "Di Franco", "card", true, () => {}, false);

  const westHand = renderHand(3, "Manno", "card", true, () => {}, false);

  const playArea = (
    <div
      className={`playArea animate main ${
        !reality ? "side" : ""
      } disabledCursor`}
    >
      {liveStatus}
      {auctionEnded ? contract : null}
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

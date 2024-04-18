import React, { useContext } from "react";
import "./Auction.css";
import "./View.css";
import { Context } from "../Context/Context";
import input from "../Input/Input.json";

const Auction = () => {
  const { auction } = useContext(Context);
  const bidText = (bid) => {
    const suitChars = { 0: "\u2660", 1: "\u2665", 2: "\u2666", 3: "\u2663" };
    const text =
      bid.action === "BID"
        ? `${bid.level}${suitChars[bid.strain] ?? "NT"}`
        : bid.action === "DBL"
        ? "X"
        : bid.action === "RDBL"
        ? "XX"
        : bid.action;
    return (
      <div className={`bid ${bid.strain >= 0 ? `suit${bid.strain}` : ""}`}>
        {text}
      </div>
    );
  };

  const firstBidDirection = input.events.find(
    (event) => event.message["@class"] === "BidMessage"
  ).message.bid.direction;

  return (
    <div className="auctionAndExplanations">
      <div className="auction">
        <div className="bidDirection">WEST</div>
        <div className="bidDirection">NORTH</div>
        <div className="bidDirection">EAST</div>
        <div className="bidDirection">SOUTH</div>
        {!["WEST"].includes(firstBidDirection) && <div />}
        {!["WEST", "NORTH"].includes(firstBidDirection) && <div />}
        {!["WEST", "NORTH", "EAST"].includes(firstBidDirection) && <div />}
        {auction.map((bid, idx) => (
          <div key={`bid${idx}`}>{bidText(bid)}</div>
        ))}
      </div>
    </div>
  );
};

export default Auction;

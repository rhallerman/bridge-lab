import React, { useContext } from "react";
import "./Auction.css";
import "./View.css";
import { Context } from "../Context/Context";
import input from "../Input/Input.json";

const Auction = () => {
  const { auction } = useContext(Context);
  const bidText = (bid) => {
    const suitChars = { 0: "\u2660", 1: "\u2665", 2: "\u2666", 3: "\u2663" };
    const bidLevel = bid.action === "BID" ? bid.level : undefined;
    const bidStrain =
      bid.action === "BID" ? suitChars[bid.strain] ?? "NT" : undefined;
    const otherBid = bid.action === "BID" ? undefined : bid.action;
    return (
      <div className="bidGroup">
        {bidLevel && <div>{bidLevel}</div>}
        {bidStrain && <div className={`suit${bid.strain}`}>{bidStrain}</div>}
        {otherBid && (
          <div className={`${otherBid.toLowerCase()}`}>{otherBid}</div>
        )}
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

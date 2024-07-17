import React, { useContext, useEffect, useMemo } from "react";
import "./Auction.css";
import "./View.css";
import { Context } from "../Context/Context";
import input from "../Input/Input.json";
import _ from "lodash";

const Auction = () => {
  const { auction, auctionRef, boardNumRef } = useContext(Context);
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

  // const firstBidDirection = input.events.find(
  //   (event) => event.message["@class"] === "BidMessage"
  // ).message.bid.direction;

  const firstBidDirection = useMemo(
    () => (!_.isEmpty(boardNumRef.current) ? (boardNumRef.current - 1) % 4 : 0),
    [boardNumRef.current]
  );

  return (
    <div className="auctionAndExplanations">
      <div className="auction">
        <div className="bidDirection">WEST</div>
        <div className="bidDirection">NORTH</div>
        <div className="bidDirection">EAST</div>
        <div className="bidDirection">SOUTH</div>
        {![3].includes(firstBidDirection) && <div />}
        {![3, 0].includes(firstBidDirection) && <div />}
        {![3, 0, 1].includes(firstBidDirection) && <div />}
        {auctionRef.current.map((bid, idx) => (
          <div key={`bid${idx}`}>{bidText(bid)}</div>
        ))}
      </div>
    </div>
  );
};

export default Auction;

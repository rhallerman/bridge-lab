import { useState, createContext, useEffect, useRef, useCallback } from "react";
import input from "../Input/Input.json";
import _ from "lodash";
import { TextField } from "@mui/material";

export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [metaEventName, setMetaEventName] = useState("");
  const [eventName, setEventName] = useState("");
  const [roundInfo, setRoundInfo] = useState("");
  const [roomInfo, setRoomInfo] = useState("");
  const [segmentNum, setSegmentNum] = useState("");
  const [numSegments, setNumSegments] = useState("");
  const [boardNum, setBoardNum] = useState("");
  const [numBoards, setNumBoards] = useState("");
  const [vul, setVul] = useState(null);
  const [deck, setDeck] = useState(null);
  const [fromSrc, setFromSrc] = useState(true);
  const [hands, setHands] = useState([[], [], [], []]);
  const [handsDup, setHandsDup] = useState([[], [], [], []]);
  const [playedHands, setPlayedHands] = useState([[], [], [], []]);
  const [playedHandsDup, setPlayedHandsDup] = useState([[], [], [], []]);
  const [playedCards, setPlayedCards] = useState(new Set());
  const [playedCardsDup, setPlayedCardsDup] = useState(new Set());
  const [contractLevel, setContractLevel] = useState(null);
  const [contractSuit, setContractSuit] = useState(null);
  const [contractDbl, setContractDbl] = useState(0);
  const [declarer, setDeclarer] = useState(null);
  const [leader, setLeader] = useState(0);
  const [suitLed, setSuitLed] = useState(null);
  const [whoseTurn, setWhoseTurn] = useState(null);
  const [trickCards, setTrickCards] = useState(new Set());
  const [trickCardsDup, setTrickCardsDup] = useState(new Set());
  const [currentWinningCard, setCurrentWinningCard] = useState(null);
  const [currentWinningPlayer, setCurrentWinningPlayer] = useState(null);
  const [storedStates, setStoredStates] = useState(null);
  const [lockedBy, setLockedBy] = useState(null);
  const [reality, setReality] = useState(true);
  const [mode, setMode] = useState("play");
  const [assignTo, setAssignTo] = useState(0);
  const [unassignedCards, setUnassignedCards] = useState([]);
  const [unassignedCardsDup, setUnassignedCardsDup] = useState([]);
  const [tradeCard, setTradeCard] = useState(null);
  const [shape, setShape] = useState([]);
  const [kibitzPlayer, setKibitzPlayer] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyDup, setHistoryDup] = useState([]);
  const [trump, setTrump] = useState(null);
  const [typedSuit, setTypedSuit] = useState(0);
  const [typedRank, setTypedRank] = useState(null);
  const [site, setSite] = useState("BBO");
  const [broadcastType, setBroadcastType] = useState("stream");
  const [showPlayedCards, setShowPlayedCards] = useState(false);
  const [auction, setAuction] = useState([]);
  const [explanations, setExplanations] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [nextEventID, setNextEventID] = useState(null);
  const [commentators, setCommentators] = useState([""]);
  const [username, setUsername] = useState("");
  const [connectedUser, setConnectedUser] = useState(null);
  const [host, setHost] = useState(null);
  const [northName, setNorthName] = useState("");
  const [eastName, setEastName] = useState("");
  const [southName, setSouthName] = useState("");
  const [westName, setWestName] = useState("");
  const [canvas, setCanvas] = useState(null);
  const [video, setVideo] = useState(null);
  const [calibrationImage, setCalibrationImage] = useState(null);
  const [captureStream, setCaptureStream] = useState(null);
  const [capturedCards0, setCapturedCards0] = useState([]);
  const [capturedCards1, setCapturedCards1] = useState([]);
  const [capturedCards2, setCapturedCards2] = useState([]);
  const [capturedCards3, setCapturedCards3] = useState([]);
  const [calibrationOpen, setCalibrationOpen] = useState(false);
  const [startHand00, setStartHand00] = useState(null);
  const [endHand00, setEndHand00] = useState(null);
  const [startHand01, setStartHand01] = useState(null);
  const [endHand01, setEndHand01] = useState(null);
  const [startHand02, setStartHand02] = useState(null);
  const [endHand02, setEndHand02] = useState(null);
  const [startHand03, setStartHand03] = useState(null);
  const [endHand03, setEndHand03] = useState(null);
  const [startName0, setStartName0] = useState(null);
  const [endName0, setEndName0] = useState(null);
  const [startHand10, setStartHand10] = useState(null);
  const [endHand10, setEndHand10] = useState(null);
  const [startHand11, setStartHand11] = useState(null);
  const [endHand11, setEndHand11] = useState(null);
  const [startHand12, setStartHand12] = useState(null);
  const [endHand12, setEndHand12] = useState(null);
  const [startHand13, setStartHand13] = useState(null);
  const [endHand13, setEndHand13] = useState(null);
  const [startName1, setStartName1] = useState(null);
  const [endName1, setEndName1] = useState(null);
  const [startHand20, setStartHand20] = useState(null);
  const [endHand20, setEndHand20] = useState(null);
  const [startHand21, setStartHand21] = useState(null);
  const [endHand21, setEndHand21] = useState(null);
  const [startHand22, setStartHand22] = useState(null);
  const [endHand22, setEndHand22] = useState(null);
  const [startHand23, setStartHand23] = useState(null);
  const [endHand23, setEndHand23] = useState(null);
  const [startName2, setStartName2] = useState(null);
  const [endName2, setEndName2] = useState(null);
  const [startHand30, setStartHand30] = useState(null);
  const [endHand30, setEndHand30] = useState(null);
  const [startHand31, setStartHand31] = useState(null);
  const [endHand31, setEndHand31] = useState(null);
  const [startHand32, setStartHand32] = useState(null);
  const [endHand32, setEndHand32] = useState(null);
  const [startHand33, setStartHand33] = useState(null);
  const [endHand33, setEndHand33] = useState(null);
  const [startName3, setStartName3] = useState(null);
  const [endName3, setEndName3] = useState(null);
  const [startContractDirection, setStartContractDirection] = useState(null);
  const [endContractDirection, setEndContractDirection] = useState(null);
  const [startBoardNum, setStartBoardNum] = useState(null);
  const [endBoardNum, setEndBoardNum] = useState(null);
  const [startAuction, setStartAuction] = useState(null);
  const [endAuction, setEndAuction] = useState(null);

  const boardNumRef = useRef();
  boardNumRef.current = boardNum;
  const handsRef = useRef();
  handsRef.current = hands;
  const handsDupRef = useRef();
  handsDupRef.current = handsDup;
  const playedHandsRef = useRef();
  playedHandsRef.current = playedHands;
  const playedHandsDupRef = useRef();
  playedHandsDupRef.current = playedHandsDup;
  const playedCardsRef = useRef();
  playedCardsRef.current = playedCards;
  const playedCardsDupRef = useRef();
  playedCardsDupRef.current = playedCardsDup;
  const auctionRef = useRef();
  auctionRef.current = auction;
  const leaderRef = useRef();
  leaderRef.current = leader;
  const suitLedRef = useRef();
  suitLedRef.current = suitLed;
  const whoseTurnRef = useRef();
  whoseTurnRef.current = whoseTurn;
  const trickCardsRef = useRef();
  trickCardsRef.current = trickCards;
  const trickCardsDupRef = useRef();
  trickCardsDupRef.current = trickCardsDup;
  const currentWinningCardRef = useRef();
  currentWinningCardRef.current = currentWinningCard;
  const currentWinningPlayerRef = useRef();
  currentWinningPlayerRef.current = currentWinningPlayer;
  const realityRef = useRef();
  realityRef.current = reality;
  const liveEventsRef = useRef();
  liveEventsRef.current = liveEvents;
  const historyRef = useRef();
  historyRef.current = history;
  const historyDupRef = useRef();
  historyDupRef.current = historyDup;
  const unassignedCardsRef = useRef();
  unassignedCardsRef.current = unassignedCards;
  const videoRef = useRef();
  videoRef.current = video;
  const contractLevelRef = useRef();
  contractLevelRef.current = contractLevel;
  const trumpRef = useRef();
  trumpRef.current = trump;
  const capturedCards0Ref = useRef();
  capturedCards0Ref.current = capturedCards0;
  const capturedCards1Ref = useRef();
  capturedCards1Ref.current = capturedCards1;
  const capturedCards2Ref = useRef();
  capturedCards2Ref.current = capturedCards2;
  const capturedCards3Ref = useRef();
  capturedCards3Ref.current = capturedCards3;
  const northNameRef = useRef();
  northNameRef.current = northName;
  const eastNameRef = useRef();
  eastNameRef.current = eastName;
  const southNameRef = useRef();
  southNameRef.current = southName;
  const westNameRef = useRef();
  westNameRef.current = westName;
  const startHand00Ref = useRef();
  startHand00Ref.current = startHand00;
  const endHand00Ref = useRef();
  endHand00Ref.current = endHand00;
  const startHand01Ref = useRef();
  startHand01Ref.current = startHand01;
  const endHand01Ref = useRef();
  endHand01Ref.current = endHand01;
  const startHand02Ref = useRef();
  startHand02Ref.current = startHand02;
  const endHand02Ref = useRef();
  endHand02Ref.current = endHand02;
  const startHand03Ref = useRef();
  startHand03Ref.current = startHand03;
  const endHand03Ref = useRef();
  endHand03Ref.current = endHand03;
  const startName0Ref = useRef();
  startName0Ref.current = startName0;
  const endName0Ref = useRef();
  endName0Ref.current = endName0;
  const startHand10Ref = useRef();
  startHand10Ref.current = startHand10;
  const endHand10Ref = useRef();
  endHand10Ref.current = endHand10;
  const startHand11Ref = useRef();
  startHand11Ref.current = startHand11;
  const endHand11Ref = useRef();
  endHand11Ref.current = endHand11;
  const startHand12Ref = useRef();
  startHand12Ref.current = startHand12;
  const endHand12Ref = useRef();
  endHand12Ref.current = endHand12;
  const startHand13Ref = useRef();
  startHand13Ref.current = startHand13;
  const endHand13Ref = useRef();
  endHand13Ref.current = endHand13;
  const startName1Ref = useRef();
  startName1Ref.current = startName1;
  const endName1Ref = useRef();
  endName1Ref.current = endName1;
  const startHand20Ref = useRef();
  startHand20Ref.current = startHand20;
  const endHand20Ref = useRef();
  endHand20Ref.current = endHand20;
  const startHand21Ref = useRef();
  startHand21Ref.current = startHand21;
  const endHand21Ref = useRef();
  endHand21Ref.current = endHand21;
  const startHand22Ref = useRef();
  startHand22Ref.current = startHand22;
  const endHand22Ref = useRef();
  endHand22Ref.current = endHand22;
  const startHand23Ref = useRef();
  startHand23Ref.current = startHand23;
  const endHand23Ref = useRef();
  endHand23Ref.current = endHand23;
  const startName2Ref = useRef();
  startName2Ref.current = startName2;
  const endName2Ref = useRef();
  endName2Ref.current = endName2;
  const startHand30Ref = useRef();
  startHand30Ref.current = startHand30;
  const endHand30Ref = useRef();
  endHand30Ref.current = endHand30;
  const startHand31Ref = useRef();
  startHand31Ref.current = startHand31;
  const endHand31Ref = useRef();
  endHand31Ref.current = endHand31;
  const startHand32Ref = useRef();
  startHand32Ref.current = startHand32;
  const endHand32Ref = useRef();
  endHand32Ref.current = endHand32;
  const startHand33Ref = useRef();
  startHand33Ref.current = startHand33;
  const endHand33Ref = useRef();
  endHand33Ref.current = endHand33;
  const startName3Ref = useRef();
  startName3Ref.current = startName3;
  const endName3Ref = useRef();
  endName3Ref.current = endName3;
  const startContractDirectionRef = useRef();
  startContractDirectionRef.current = startContractDirection;
  const endContractDirectionRef = useRef();
  endContractDirectionRef.current = endContractDirection;
  const startBoardNumRef = useRef();
  startBoardNumRef.current = startBoardNum;
  const endBoardNumRef = useRef();
  endBoardNumRef.current = endBoardNum;
  const startAuctionRef = useRef();
  startAuctionRef.current = startAuction;
  const endAuctionRef = useRef();
  endAuctionRef.current = endAuction;

  const resetAll = () => {
    console.log("------- RESET -------");
    setBoardNum("");
    setVul(null);
    setDeck(null);
    setHands([[], [], [], []]);
    setHandsDup([[], [], [], []]);
    setPlayedHands([[], [], [], []]);
    setPlayedHandsDup([[], [], [], []]);
    setPlayedCards(new Set());
    setPlayedCardsDup(new Set());
    setContractLevel(null);
    setContractSuit(null);
    setContractDbl(0);
    setDeclarer(null);
    setLeader(0);
    setSuitLed(null);
    setWhoseTurn(null);
    setTrickCards(new Set());
    setTrickCardsDup(new Set());
    setCurrentWinningCard(null);
    setCurrentWinningPlayer(null);
    setStoredStates(null);
    setTrump(null);
    setAuction([]);
    setExplanations([]);
    setLiveEvents([]);
    setNextEventID(null);
  };

  const suitChars = {
    0: "\u2660",
    1: "\u2665",
    2: "\u2666",
    3: "\u2663",
    "-1": "NT",
  };

  const visionToRank = (vision) => {
    return vision === "A"
      ? 0
      : vision === "K"
      ? 1
      : vision === "Q" || vision === "O" || vision === "0"
      ? 2
      : vision === "J" || vision === "]" || vision === "f"
      ? 3
      : vision === "T"
      ? 4
      : vision === "M"
      ? 11
      : 14 - parseInt(vision);
  };

  useEffect(() => {
    const zeroIndexedBoardNum = boardNum - 1;
    setVul((zeroIndexedBoardNum + Math.floor(zeroIndexedBoardNum / 4)) % 4);
  }, [boardNum]);

  // const inputToDeckFromStream = (event) => {
  //   const deal = event.handData;
  //   let tempDeck = [];
  //   for (const hand of ["north", "east", "south", "west"]) {
  //     for (let suit = 0; suit < 4; suit++) {
  //       const cards = deal[hand].split(", ")[suit];
  //       for (let card of cards.split("")) {
  //         const rank =
  //           card === "A"
  //             ? 0
  //             : card === "K"
  //             ? 1
  //             : card === "Q"
  //             ? 2
  //             : card === "J"
  //             ? 3
  //             : card === "T"
  //             ? 4
  //             : 14 - parseInt(card);
  //         tempDeck.push({ suit, rank });
  //       }
  //     }
  //   }
  //   setDeck(tempDeck);
  //   setHands([
  //     tempDeck.slice(0, 13).map((card) => ({ ...card, hand: 0 })),
  //     tempDeck.slice(13, 26).map((card) => ({ ...card, hand: 1 })),
  //     tempDeck.slice(26, 39).map((card) => ({ ...card, hand: 2 })),
  //     tempDeck.slice(39, 52).map((card) => ({ ...card, hand: 3 })),
  //   ]);
  //   const zeroIndexedBoardNum = event.boardNumber - 1;
  //   setVul((zeroIndexedBoardNum + Math.floor(zeroIndexedBoardNum / 4)) % 4);
  //   setBoardNum(event.boardNumber);
  //   setSegmentNum(event.round);
  // };

  // const createShuffledDeck = () => {
  //   const freshDeck = [...Array(52).keys()].map((card) => ({
  //     suit: Math.floor(card / 13),
  //     rank: card % 13,
  //   }));
  //   for (let i = 0; i < 52; i++) {
  //     const swapIdx = Math.floor(Math.random() * (52 - i)) + i;
  //     const tempSwap = freshDeck[swapIdx];
  //     freshDeck[swapIdx] = freshDeck[i];
  //     freshDeck[i] = tempSwap;
  //   }
  //   setDeck(freshDeck);
  // };

  // const dealCards = () => {
  //   setHands([
  //     deck.slice(0, 13).map((card) => ({ ...card, hand: 0 })),
  //     deck.slice(13, 26).map((card) => ({ ...card, hand: 1 })),
  //     deck.slice(26, 39).map((card) => ({ ...card, hand: 2 })),
  //     deck.slice(39, 52).map((card) => ({ ...card, hand: 3 })),
  //   ]);
  // };

  const bid = (bid) => {
    // setHistory([
    //   {
    //     action: "play",
    //     hands: handsRef.current,
    //     playedHands: playedHandsRef.current,
    //     playedCards: playedCardsRef.current,
    //     suitLed: suitLedRef.current,
    //     currentWinningCard: currentWinningCardRef.current,
    //     currentWinningPlayer: currentWinningPlayerRef.current,
    //     leader: leaderRef.current,
    //     whoseTurn: whoseTurnRef.current,
    //     trickCards: trickCardsRef.current,
    //   },
    //   ...historyRef.current,
    // ]);
    let tempAuction = [...auctionRef.current];
    tempAuction.push(bid);
    setAuction(tempAuction);
  };

  const play = (card, playedInReality) => {
    (playedInReality ? setHistory : setHistoryDup)([
      {
        action: "play",
        hands: playedInReality ? handsRef.current : handsDupRef.current,
        playedHands: playedInReality
          ? playedHandsRef.current
          : playedHandsDupRef.current,
        playedCards: playedInReality
          ? playedCardsRef.current
          : playedCardsDupRef.current,
        suitLed: playedInReality ? suitLedRef.current : null,
        currentWinningCard: currentWinningCardRef.current,
        currentWinningPlayer: currentWinningPlayerRef.current,
        leader: playedInReality ? leaderRef.current : null,
        whoseTurn: playedInReality ? whoseTurnRef.current : null,
        trickCards: playedInReality
          ? trickCardsRef.current
          : trickCardsDupRef.current,
      },
      ...(playedInReality ? historyRef.current : historyDupRef.current),
    ]);
    const cardIdx = (playedInReality ? handsRef.current : handsDupRef.current)[
      card.hand
    ].findIndex(
      (cardInHand) =>
        cardInHand.suit === card.suit &&
        cardInHand.rank === card.rank &&
        cardInHand.xIdx === card.xIdx
    );
    let tempHands = _.cloneDeep(
      playedInReality ? handsRef.current : handsDupRef.current
    );
    tempHands[card.hand].splice(cardIdx, 1);
    (playedInReality ? setHands : setHandsDup)(tempHands);
    let tempPlayedHands = _.cloneDeep(
      playedInReality ? playedHandsRef.current : playedHandsDupRef.current
    );
    tempPlayedHands[card.hand].push(card);
    (playedInReality ? setPlayedHands : setPlayedHandsDup)(tempPlayedHands);
    if (
      (playedInReality ? trickCardsRef.current : trickCardsDupRef.current)
        .size === 4
    ) {
      let tempTrickCards = new Set();
      tempTrickCards.add({ ...card, hand: card.hand });
      (playedInReality ? setTrickCards : setTrickCardsDup)(tempTrickCards);
    } else {
      let tempTrickCards = new Set(
        playedInReality ? trickCardsRef.current : trickCardsDupRef.current
      );
      tempTrickCards.add({ ...card, hand: card.hand });
      (playedInReality ? setTrickCards : setTrickCardsDup)(tempTrickCards);
    }
    let tempPlayedCards = new Set(
      playedInReality ? playedCardsRef.current : playedCardsDupRef.current
    );
    tempPlayedCards.add(`${card.suit},${card.rank},${card.xIdx ?? ""}`);
    (playedInReality ? setPlayedCards : setPlayedCardsDup)(tempPlayedCards);
    if (playedInReality) {
      const isCardWinning =
        card.hand === leaderRef.current ||
        (card.suit === trumpRef.current &&
          (currentWinningCardRef.current.suit !== trumpRef.current ||
            card.rank < currentWinningCardRef.current.rank)) ||
        (card.suit === suitLedRef.current &&
          currentWinningCardRef.current.suit !== trumpRef.current &&
          card.rank < currentWinningCardRef.current.rank);
      const newCurrentWinningCard = isCardWinning
        ? card
        : currentWinningCardRef.current;
      const newCurrentWinningPlayer = isCardWinning
        ? card.hand
        : currentWinningPlayerRef.current;
      if (card.hand === leaderRef.current) {
        setSuitLed(card.suit);
      }
      setCurrentWinningCard(newCurrentWinningCard);
      setCurrentWinningPlayer(newCurrentWinningPlayer);
      const nextTurn = (card.hand + 1) % 4;
      if (nextTurn === leaderRef.current) {
        setLeader(newCurrentWinningPlayer);
        setSuitLed(null);
        setCurrentWinningCard(null);
        setCurrentWinningPlayer(null);
        setWhoseTurn(newCurrentWinningPlayer);
      } else {
        setWhoseTurn(nextTurn);
      }
    }
  };

  const strToLevel = (str) => {
    const lookup = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      SIX: 6,
      SEVEN: 7,
    };
    return lookup[str];
  };

  const strToSuit = (str) => {
    if (str.startsWith("SPADE")) return 0;
    if (str.startsWith("HEART")) return 1;
    if (str.startsWith("DIAMOND")) return 2;
    if (str.startsWith("CLUB")) return 3;
    return -1;
  };

  const strToDirection = (str) => {
    const lookup = {
      NORTH: 0,
      North: 0,
      EAST: 1,
      East: 1,
      SOUTH: 2,
      South: 2,
      WEST: 3,
      West: 3,
    };
    return lookup[str];
  };

  const directionToStr = (dir) => {
    const lookup = { 0: "NORTH", 1: "EAST", 2: "SOUTH", 3: "WEST" };
    return lookup[dir];
  };

  const bidFromInput = useCallback(() => {
    const firstBidIdx = input.events.findIndex(
      (event) => event.message["@class"] === "BidMessage"
    );
    const bidIdx = auctionRef.current.length;
    const event = input.events[bidIdx + firstBidIdx];
    const bidMade = event.message.bid.bidCode;
    const direction = event.message.bid.direction;
    const nextBid = {};
    if (bidMade.includes("_")) {
      nextBid.action = "BID";
      const split = bidMade.split("_");
      nextBid.level = strToLevel(split[0]);
      nextBid.strain = strToSuit(split[1]);
    } else {
      nextBid.action = bidMade;
    }
    nextBid.hand =
      direction === "NORTH"
        ? 0
        : direction === "EAST"
        ? 1
        : direction === "SOUTH"
        ? 2
        : 3;
    bid(nextBid);
  }, []);

  const playFromInput = useCallback(() => {
    if (playedCardsRef.current.size === 52) return;
    const playIdx = liveEventsRef.current.length;
    const cardPlayed = input.events[playIdx].message.card;
    const suit =
      cardPlayed.suit === "SPADE"
        ? 0
        : cardPlayed.suit === "HEART"
        ? 1
        : cardPlayed.suit === "DIAMOND"
        ? 2
        : 3;
    const rank =
      cardPlayed.cardValue === "ACE"
        ? 0
        : cardPlayed.cardValue === "KING"
        ? 1
        : cardPlayed.cardValue === "QUEEN"
        ? 2
        : cardPlayed.cardValue === "JACK"
        ? 3
        : cardPlayed.cardValue === "TEN"
        ? 4
        : cardPlayed.cardValue === "NINE"
        ? 5
        : cardPlayed.cardValue === "EIGHT"
        ? 6
        : cardPlayed.cardValue === "SEVEN"
        ? 7
        : cardPlayed.cardValue === "SIX"
        ? 8
        : cardPlayed.cardValue === "FIVE"
        ? 9
        : cardPlayed.cardValue === "FOUR"
        ? 10
        : cardPlayed.cardValue === "THREE"
        ? 11
        : 12;
    const direction = input.events[playIdx].message.direction;
    const hand =
      direction === "NORTH"
        ? 0
        : direction === "EAST"
        ? 1
        : direction === "SOUTH"
        ? 2
        : 3;
    const card = { suit, rank, hand };
    play(card, true);
  }, [play]);

  const realityOn = () => {
    setReality(true);
  };

  const realityOff = () => {
    setHandsDup(_.cloneDeep(handsRef.current));
    setPlayedHandsDup(playedHandsRef.current);
    setPlayedCardsDup(playedCardsRef.current);
    setTrickCardsDup(trickCardsRef.current);
    setUnassignedCardsDup(unassignedCardsRef.current);
    setHistoryDup(historyRef.current);
    setReality(false);
  };

  // const kibitz = (player) => {
  //   if (player !== null) {
  //     const tempHands = _.cloneDeep(handsDup);
  //     tempHands.splice(player, 1);
  //     setUnassignedCards(
  //       tempHands
  //         .map((hand) =>
  //           hand.map((card) => ({ suit: card.suit, rank: card.rank }))
  //         )
  //         .flat()
  //     );
  //     setHands([
  //       player === 0 ? hands[0] : [...playedHands[0]],
  //       player === 1 ? hands[1] : [...playedHands[1]],
  //       player === 2 ? hands[2] : [...playedHands[2]],
  //       player === 3 ? hands[3] : [...playedHands[3]],
  //     ]);
  //   } else {
  //     setHands(storedStates.kibitzHands);
  //   }
  // };

  const back = () => {
    if (historyDupRef.current.length === 0) return;
    let tempHands = [...handsDup];
    const card = historyDupRef.current[0].card;
    let tempUnassignedCards = [...unassignedCardsDup];
    switch (historyDupRef.current[0].action) {
      case "play":
        setHandsDup(historyDupRef.current[0].hands);
        setPlayedHandsDup(historyDupRef.current[0].playedHands);
        setPlayedCardsDup(historyDupRef.current[0].playedCards);
        setTrickCardsDup(historyDupRef.current[0].trickCards);
        break;
      case "assign":
        const deleteCardIdx = tempHands[card.hand].findIndex(
          (assignedCard) =>
            assignedCard.suit === card.suit && assignedCard.rank === card.rank
        );
        tempHands[historyDupRef.current[0].card.hand].splice(deleteCardIdx, 1);
        setHandsDup(tempHands);
        tempUnassignedCards.push({ suit: card.suit, rank: card.rank });
        setUnassignedCardsDup(tempUnassignedCards);
        break;
      case "unassign":
        let assignedCard = { ...card };
        tempHands[card.hand].push(assignedCard);
        setHandsDup(tempHands);
        const deleteIdx = tempUnassignedCards.findIndex(
          (unassignedCard) =>
            unassignedCard.suit === card.suit &&
            unassignedCard.rank === card.rank
        );
        tempUnassignedCards.splice(deleteIdx, 1);
        setUnassignedCardsDup(tempUnassignedCards);
        break;
      case "trade":
        const card0 = historyDupRef.current[0].cards[0];
        const card1 = historyDupRef.current[0].cards[1];
        const deleteIdx0 = tempHands[card1.hand].findIndex(
          (assignedCard) =>
            assignedCard.suit === card0.suit && assignedCard.rank === card0.rank
        );
        tempHands[card1.hand].splice(deleteIdx0, 1);
        tempHands[card0.hand].push({ ...card0, hand: card0.hand });
        const deleteIdx1 = tempHands[card0.hand].findIndex(
          (assignedCard) =>
            assignedCard.suit === card1.suit && assignedCard.rank === card1.rank
        );
        tempHands[card0.hand].splice(deleteIdx1, 1);
        tempHands[card1.hand].push({ ...card1, hand: card1.hand });
        break;
      default:
        break;
    }
    let tempHistory = [...historyDupRef.current];
    tempHistory.shift();
    setHistoryDup(tempHistory);
  };

  const forward = () => {
    // const eventClass = input.events[liveEvents.length].message["@class"];
    // if (eventClass === "BidMessage") {
    //   bidFromInput();
    // } else if (eventClass === "EndAuctionMessage") {
    //   const declarer =
    //     input.events[liveEvents.length].message.contract.direction;
    //   setWhoseTurn(
    //     declarer === "NORTH"
    //       ? 1
    //       : declarer === "EAST"
    //       ? 2
    //       : declarer === "SOUTH"
    //       ? 3
    //       : 0
    //   );
    // } else if (eventClass === "PlayCardMessage") {
    //   playFromInput();
    // }
    // setLiveEvents([...liveEvents, input.events[liveEvents.length]]);
  };

  const assign = (card) => {
    let tempHands = [...handsDup];
    const maybeXCardIdx = tempHands[assignTo].findIndex(
      (xCard) => xCard.suit === card.suit && xCard.rank === 13
    );
    if (maybeXCardIdx >= 0) {
      tempHands[assignTo].splice(maybeXCardIdx, 1);
    }
    let assignedCard = { ...card, hand: assignTo };
    tempHands[assignTo].push(assignedCard);
    setHandsDup(tempHands);
    let tempUnassignedCards = [...unassignedCardsDup];
    const deleteIdx = tempUnassignedCards.findIndex(
      (unassignedCard) =>
        unassignedCard.suit === card.suit && unassignedCard.rank === card.rank
    );
    tempUnassignedCards.splice(deleteIdx, 1);
    setUnassignedCardsDup(tempUnassignedCards);
    setHistoryDup([{ action: "assign", card: assignedCard }, ...historyDup]);
  };

  const unassign = (card) => {
    let tempHands = [...handsDup];
    const deleteCardIdx = tempHands[card.hand].findIndex(
      (assignedCard) =>
        assignedCard.suit === card.suit && assignedCard.rank === card.rank
    );
    tempHands[card.hand].splice(deleteCardIdx, 1);
    setHandsDup(tempHands);
    let tempUnassignedCards = [...unassignedCardsDup];
    tempUnassignedCards.push(card);
    setUnassignedCardsDup(tempUnassignedCards);
    setHistoryDup([{ action: "unassign", card: card }, ...historyDup]);
  };

  const trade = (card) => {
    if (tradeCard) {
      let tempHands = [...handsDup];
      const deleteIdx1 = tempHands[tradeCard.hand].findIndex(
        (assignedCard) =>
          assignedCard.suit === tradeCard.suit &&
          assignedCard.rank === tradeCard.rank
      );
      tempHands[tradeCard.hand].splice(deleteIdx1, 1);
      tempHands[card.hand].push({ ...tradeCard, hand: card.hand });
      const deleteIdx2 = tempHands[card.hand].findIndex(
        (assignedCard) =>
          assignedCard.suit === card.suit && assignedCard.rank === card.rank
      );
      tempHands[card.hand].splice(deleteIdx2, 1);
      tempHands[tradeCard.hand].push({ ...card, hand: tradeCard.hand });
      setHistoryDup([
        { action: "trade", cards: [tradeCard, card] },
        ...historyDup,
      ]);
      setTradeCard(null);
    } else {
      setTradeCard(card);
    }
  };

  const assignShape = () => {
    let tempHands = [...handsDup];
    const handWithShape = [];
    shape.forEach((suitLength, suitIdx) => {
      const suitCard = { suit: suitIdx, rank: 13, hand: assignTo };
      const playedCardsInSuit = playedHandsDup[assignTo].filter(
        (card) => card.suit === suitIdx
      ).length;
      for (let i = playedCardsInSuit; i < suitLength; i++) {
        handWithShape.push({ ...suitCard, xIdx: i });
      }
    });
    tempHands[assignTo] = handWithShape;
    setHandsDup(tempHands);
  };

  useEffect(() => {
    if (shape.length === 4) {
      assignShape();
      setShape([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape]);

  const renderCard = (
    card,
    className,
    disabled,
    onClick,
    includeSuit,
    showAnalysis
  ) => {
    const rank =
      card.rank === 13
        ? "x"
        : card.rank === 0
        ? "A"
        : card.rank === 1
        ? "K"
        : card.rank === 2
        ? "Q"
        : card.rank === 3
        ? "J"
        : (14 - card.rank).toString();
    return (
      <div
        key={`${card.suit.toString()}${card.rank.toString()}${
          card.xIdx?.toString() ?? ""
        }`}
        className={`${className} ${
          showAnalysis &&
          tradeCard?.suit === card.suit &&
          tradeCard?.rank === card.rank &&
          tradeCard?.xIdx === card.xIdx
            ? "selected"
            : ""
        }`}
        disabled={disabled}
        onClick={(event) => {
          onClick(card, event);
          event.stopPropagation();
        }}
      >
        <div
          className={`cardFont suit${card.suit} ${
            showAnalysis &&
            !includeSuit &&
            playedCardsDup.has(`${card.suit},${card.rank},${card.xIdx ?? ""}`)
              ? "playedCard"
              : ""
          }`}
        >
          {includeSuit ? (
            <div className={`suit${card.suit}`}>{suitChars[card.suit]}</div>
          ) : null}
          {rank}
        </div>
      </div>
    );
  };

  const renderHand = (
    player,
    playerName,
    setPlayerName,
    cardClassName,
    disableAllCards,
    onClickCard,
    showAnalysis,
    editable
  ) => {
    const isHandConstructed = handsDup[player].some((card) => card.rank === 13);
    const hand = showAnalysis
      ? kibitzPlayer === null ||
        kibitzPlayer === player ||
        player === (declarer + 2) % 4 ||
        isHandConstructed
        ? handsDup[player]
        : []
      : hands[player];
    let handSuits = [[], [], [], []];
    for (const card of hand) {
      handSuits[card.suit].push(card);
    }
    if (showAnalysis && (showPlayedCards || isHandConstructed)) {
      for (const card of playedHandsDup[player]) {
        handSuits[card.suit].push(card);
      }
    }
    const suitSort = (a, b) => (a.rank < b.rank || a.xIdx < b.xIdx ? -1 : 1);
    for (const suit of handSuits) {
      suit.sort(suitSort);
    }
    let buttonGroups = [];
    for (const [suitIdx, suitCards] of handSuits.entries()) {
      let buttons = [
        <div className="card" disabled={true}>
          <div key={suitIdx} className={`cardFont suit${suitIdx}`}>
            {suitChars[suitIdx]}
          </div>
        </div>,
      ];
      for (const card of suitCards) {
        const disabled =
          disableAllCards ||
          (showAnalysis ? playedCardsDup : playedCards).has(
            `${card.suit},${card.rank},${card.xIdx ?? ""}`
          );
        const cardButton = renderCard(
          card,
          cardClassName,
          disabled,
          onClickCard,
          false,
          showAnalysis
        );
        buttons.push(cardButton);
      }
      buttonGroups[suitIdx] = (
        <div
          key={player?.toString() + suitIdx.toString()}
          className="cardGroup"
        >
          {buttons}
        </div>
      );
    }
    return (
      <div
        className={`handNameWidthWrapper hand${player} ${
          showAnalysis ? "analysis" : "live"
        }`}
        key={`hand${player}`}
      >
        <div
          className={`handNameWrapper ${
            !showAnalysis && player === whoseTurn ? "myTurn" : "notMyTurn"
          }`}
        >
          <div
            className={`hand`}
            onClick={() => {
              if (!reality) {
                setKibitzPlayer(player === kibitzPlayer ? null : player);
              }
            }}
          >
            {buttonGroups}
          </div>
          {!editable && <div className="playerTableName">{playerName}</div>}
          {editable && (
            <TextField
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              variant="outlined"
              size="small"
              className="playerTableNameInput"
              sx={{ "& fieldset": { border: "none" } }}
              inputProps={{
                style: {
                  color: "white",
                  textAlign: "center",
                  padding: "0px",
                },
              }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
          )}
        </div>
      </div>
    );
  };

  // useEffect(() => {
  //   takeNextActionAndSchedule(0);
  // }, [takeNextActionAndSchedule]);

  return (
    <Context.Provider
      value={{
        metaEventName,
        setMetaEventName,
        eventName,
        setEventName,
        roundInfo,
        setRoundInfo,
        roomInfo,
        setRoomInfo,
        segmentNum,
        setSegmentNum,
        numSegments,
        setNumSegments,
        boardNum,
        boardNumRef,
        setBoardNum,
        numBoards,
        setNumBoards,
        vul,
        deck,
        setDeck,
        fromSrc,
        setFromSrc,
        hands,
        handsRef,
        setHands,
        handsDup,
        setHandsDup,
        playedHands,
        setPlayedHands,
        playedHandsDup,
        setPlayedHandsDup,
        playedCards,
        playedCardsRef,
        setPlayedCards,
        playedCardsDup,
        setPlayedCardsDup,
        contractLevel,
        contractLevelRef,
        setContractLevel,
        contractSuit,
        setContractSuit,
        contractDbl,
        setContractDbl,
        declarer,
        setDeclarer,
        leader,
        setLeader,
        suitLed,
        setSuitLed,
        whoseTurn,
        whoseTurnRef,
        setWhoseTurn,
        trickCards,
        trickCardsRef,
        setTrickCards,
        trickCardsDup,
        setTrickCardsDup,
        currentWinningCard,
        setCurrentWinningCard,
        currentWinningPlayer,
        setCurrentWinningPlayer,
        storedStates,
        setStoredStates,
        lockedBy,
        setLockedBy,
        reality,
        setReality,
        mode,
        setMode,
        assignTo,
        setAssignTo,
        unassignedCards,
        setUnassignedCards,
        unassignedCardsDup,
        setUnassignedCardsDup,
        tradeCard,
        setTradeCard,
        shape,
        setShape,
        kibitzPlayer,
        setKibitzPlayer,
        history,
        setHistory,
        historyDup,
        setHistoryDup,
        trump,
        setTrump,
        typedSuit,
        setTypedSuit,
        typedRank,
        setTypedRank,
        site,
        setSite,
        broadcastType,
        setBroadcastType,
        showPlayedCards,
        setShowPlayedCards,
        auction,
        setAuction,
        auctionRef,
        explanations,
        setExplanations,
        liveEvents,
        setLiveEvents,
        nextEventID,
        setNextEventID,
        // takeNextActionAndSchedule,
        realityOn,
        realityOff,
        bid,
        play,
        bidFromInput,
        playFromInput,
        back,
        forward,
        assign,
        unassign,
        trade,
        suitChars,
        strToSuit,
        strToDirection,
        directionToStr,
        renderCard,
        renderHand,
        commentators,
        setCommentators,
        username,
        setUsername,
        connectedUser,
        setConnectedUser,
        host,
        setHost,
        northName,
        setNorthName,
        northNameRef,
        eastName,
        setEastName,
        eastNameRef,
        southName,
        setSouthName,
        southNameRef,
        westName,
        setWestName,
        westNameRef,
        canvas,
        setCanvas,
        video,
        videoRef,
        setVideo,
        calibrationImage,
        setCalibrationImage,
        captureStream,
        setCaptureStream,
        visionToRank,
        capturedCards0,
        capturedCards0Ref,
        setCapturedCards0,
        capturedCards1,
        capturedCards1Ref,
        setCapturedCards1,
        capturedCards2,
        capturedCards2Ref,
        setCapturedCards2,
        capturedCards3,
        capturedCards3Ref,
        setCapturedCards3,
        calibrationOpen,
        setCalibrationOpen,
        startHand00,
        setStartHand00,
        startHand00Ref,
        endHand00,
        setEndHand00,
        endHand00Ref,
        startHand01,
        setStartHand01,
        startHand01Ref,
        endHand01,
        setEndHand01,
        endHand01Ref,
        startHand02,
        setStartHand02,
        startHand02Ref,
        endHand02,
        setEndHand02,
        endHand02Ref,
        startHand03,
        setStartHand03,
        startHand03Ref,
        endHand03,
        setEndHand03,
        endHand03Ref,
        startName0,
        setStartName0,
        startName0Ref,
        endName0,
        setEndName0,
        endName0Ref,
        startHand10,
        setStartHand10,
        startHand10Ref,
        endHand10,
        setEndHand10,
        endHand10Ref,
        startHand11,
        setStartHand11,
        startHand11Ref,
        endHand11,
        setEndHand11,
        endHand11Ref,
        startHand12,
        setStartHand12,
        startHand12Ref,
        endHand12,
        setEndHand12,
        endHand12Ref,
        startHand13,
        setStartHand13,
        startHand13Ref,
        endHand13,
        setEndHand13,
        endHand13Ref,
        startName1,
        setStartName1,
        startName1Ref,
        endName1,
        setEndName1,
        endName1Ref,
        startHand20,
        setStartHand20,
        startHand20Ref,
        endHand20,
        setEndHand20,
        endHand20Ref,
        startHand21,
        setStartHand21,
        startHand21Ref,
        endHand21,
        setEndHand21,
        endHand21Ref,
        startHand22,
        setStartHand22,
        startHand22Ref,
        endHand22,
        setEndHand22,
        endHand22Ref,
        startHand23,
        setStartHand23,
        startHand23Ref,
        endHand23,
        setEndHand23,
        endHand23Ref,
        startName2,
        setStartName2,
        startName2Ref,
        endName2,
        setEndName2,
        endName2Ref,
        startHand30,
        setStartHand30,
        startHand30Ref,
        endHand30,
        setEndHand30,
        endHand30Ref,
        startHand31,
        setStartHand31,
        startHand31Ref,
        endHand31,
        setEndHand31,
        endHand31Ref,
        startHand32,
        setStartHand32,
        startHand32Ref,
        endHand32,
        setEndHand32,
        endHand32Ref,
        startHand33,
        setStartHand33,
        startHand33Ref,
        endHand33,
        setEndHand33,
        endHand33Ref,
        startName3,
        setStartName3,
        startName3Ref,
        endName3,
        setEndName3,
        endName3Ref,
        startContractDirection,
        setStartContractDirection,
        startContractDirectionRef,
        endContractDirection,
        setEndContractDirection,
        endContractDirectionRef,
        startBoardNum,
        setStartBoardNum,
        startBoardNumRef,
        endBoardNum,
        setEndBoardNum,
        endBoardNumRef,
        startAuction,
        setStartAuction,
        startAuctionRef,
        endAuction,
        setEndAuction,
        endAuctionRef,
        resetAll,
      }}
    >
      {children}
    </Context.Provider>
  );
};

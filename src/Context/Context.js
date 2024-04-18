import { useState, createContext, useEffect, useRef, useCallback } from "react";
import input from "../Input/Input.json";
import _ from "lodash";

export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [metaEventName, setMetaEventName] = useState(
    "2024 US BRIDGE CHAMPIONSHIPS"
  );
  const [eventName, setEventName] = useState("OPEN TEAMS");
  const [roundInfo, setRoundInfo] = useState("ROUND OF 32");
  const [roomInfo, setRoomInfo] = useState("OPEN ROOM");
  const [segmentNum, setSegmentNum] = useState("");
  const [numSegments, setNumSegments] = useState("4");
  const [boardNum, setBoardNum] = useState("");
  const [numBoards, setNumBoards] = useState("30");
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
  const [declarer, setDeclarer] = useState(null);
  const [leader, setLeader] = useState(0);
  const [suitLed, setSuitLed] = useState(null);
  const [whoseTurn, setWhoseTurn] = useState(0);
  const [trickCards, setTrickCards] = useState(new Set());
  const [trickCardsDup, setTrickCardsDup] = useState(new Set());
  const [currentWinningCard, setCurrentWinningCard] = useState(null);
  const [currentWinningPlayer, setCurrentWinningPlayer] = useState(null);
  const [storedStates, setStoredStates] = useState(null);
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
  const [trump, setTrump] = useState(3);
  const [typedSuit, setTypedSuit] = useState(0);
  const [typedRank, setTypedRank] = useState(null);
  const [broadcastType, setBroadcastType] = useState("stream");
  const [showPlayedCards, setShowPlayedCards] = useState(false);
  const [auction, setAuction] = useState([]);
  const [explanations, setExplanations] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [lastEventTime, setLastEventTime] = useState(null);
  const [timeUntilNextEvent, setTimeUntilNextEvent] = useState(null);
  const [nextEventID, setNextEventID] = useState(null);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [commentators, setCommentators] = useState([""]);

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
  const auctionRef = useRef();
  auctionRef.current = auction;
  const historyRef = useRef();
  historyRef.current = history;
  const historyDupRef = useRef();
  historyDupRef.current = historyDup;
  const timeUntilNextEventRef = useRef();
  timeUntilNextEventRef.current = timeUntilNextEvent;
  const lastEventTimeRef = useRef();
  lastEventTimeRef.current = lastEventTime;
  const unassignedCardsRef = useRef();
  unassignedCardsRef.current = unassignedCards;

  const suitChars = { 0: "\u2660", 1: "\u2665", 2: "\u2666", 3: "\u2663" };

  const inputToDeck = (event) => {
    const deal = event.handData;
    let tempDeck = [];
    for (const hand of ["north", "east", "south", "west"]) {
      for (let suit = 0; suit < 4; suit++) {
        const cards = deal[hand].split(", ")[suit];
        for (let card of cards.split("")) {
          const rank =
            card === "A"
              ? 0
              : card === "K"
              ? 1
              : card === "Q"
              ? 2
              : card === "J"
              ? 3
              : card === "T"
              ? 4
              : 14 - parseInt(card);
          tempDeck.push({ suit, rank });
        }
      }
    }
    setDeck(tempDeck);
    setHands([
      tempDeck.slice(0, 13).map((card) => ({ ...card, hand: 0 })),
      tempDeck.slice(13, 26).map((card) => ({ ...card, hand: 1 })),
      tempDeck.slice(26, 39).map((card) => ({ ...card, hand: 2 })),
      tempDeck.slice(39, 52).map((card) => ({ ...card, hand: 3 })),
    ]);
    const zeroIndexedBoardNum = event.boardNumber - 1;
    setVul((zeroIndexedBoardNum + Math.floor(zeroIndexedBoardNum / 4)) % 4);
    setBoardNum(event.boardNumber);
    setSegmentNum(event.round);
  };

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
    const auctionLength = tempAuction.length;
    if (
      auctionLength < 4 ||
      tempAuction[auctionLength - 1].action !== "PASS" ||
      tempAuction[auctionLength - 2].action !== "PASS" ||
      tempAuction[auctionLength - 3].action !== "PASS"
    )
      setWhoseTurn((whoseTurnRef.current + 1) % 4);
  };

  const play = useCallback(
    (card, playedInReality) => {
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
      const cardIdx = (
        playedInReality ? handsRef.current : handsDupRef.current
      )[card.hand].findIndex(
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
          (card.suit === trump &&
            (currentWinningCardRef.current.suit !== trump ||
              card.rank < currentWinningCardRef.current.rank)) ||
          (card.suit === suitLedRef.current &&
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
    },
    [trump]
  );

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
    const lookup = { NORTH: 0, EAST: 1, SOUTH: 2, WEST: 3 };
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

  const takeNextActionAndSchedule = useCallback(
    (interval) => {
      setNextEventID(
        setTimeout(() => {
          setLastEventTime(Date.now());
          if (input.events[liveEventsRef.current.length + 1]) {
            const nextInterval =
              new Date(
                input.events[liveEventsRef.current.length + 1].createdAt
              ).getTime() -
              new Date(
                input.events[liveEventsRef.current.length].createdAt
              ).getTime();
            if (broadcastType === "stream" || realityRef.current) {
              setTimeUntilNextEvent(nextInterval);
              takeNextActionAndSchedule(nextInterval);
            }
          }
          const event = input.events[liveEventsRef.current.length].message;
          const eventClass = event["@class"];
          if (eventClass === "HandDataMessage") {
            // const startTime = new Date(input.start.createdAt).getTime();
            // const currentTime = Date.now();
            // const bid0Time = new Date(input.events[0].createdAt).getTime();
            // const interval0 = bid0Time - startTime;
            // setLastEventTime(currentTime);
            // setTimeUntilNextEvent(interval0);
            // if (realityRef.current && interval0) {
            //   takeNextActionAndSchedule(interval0);
            // }
            inputToDeck(event);
          } else if (eventClass === "BidMessage") {
            bidFromInput();
          } else if (eventClass === "EndAuctionMessage") {
            const split =
              input.events[
                liveEventsRef.current.length
              ].message.contract.bid.split("_");
            setContractLevel(strToLevel(split[0]));
            setContractSuit(strToSuit(split[1]));
            const tempDeclarer =
              input.events[liveEventsRef.current.length].message.contract
                .declarer;
            setDeclarer(strToDirection(tempDeclarer));
            setWhoseTurn((strToDirection(tempDeclarer) + 1) % 4);
            setAuctionEnded(true);
          } else if (eventClass === "PlayCardMessage") {
            playFromInput();
          }
          setLiveEvents([
            ...liveEventsRef.current,
            input.events[liveEventsRef.current.length],
          ]);
        }, interval)
      );
    },
    [bidFromInput, broadcastType, playFromInput]
  );

  const realityOn = () => {
    setReality(true);
    if (broadcastType === "video") {
      const currentTime = Date.now();
      takeNextActionAndSchedule(timeUntilNextEventRef.current);
      setLastEventTime(currentTime);
    }
  };

  const realityOff = () => {
    setHandsDup(_.cloneDeep(handsRef.current));
    setPlayedHandsDup(playedHandsRef.current);
    setPlayedCardsDup(playedCardsRef.current);
    setTrickCardsDup(trickCardsRef.current);
    setUnassignedCardsDup(unassignedCardsRef.current);
    setHistoryDup(historyRef.current);
    if (broadcastType === "video") {
      const currentTime = Date.now();
      clearTimeout(nextEventID);
      setTimeUntilNextEvent(
        timeUntilNextEventRef.current - (currentTime - lastEventTimeRef.current)
      );
      setLastEventTime(currentTime);
    }
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
    cardClassName,
    disableAllCards,
    onClickCard,
    showAnalysis
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
          <div className="playerTableName">{playerName}</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    takeNextActionAndSchedule(0);
  }, [takeNextActionAndSchedule]);

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
        setBoardNum,
        numBoards,
        setNumBoards,
        vul,
        deck,
        setDeck,
        fromSrc,
        setFromSrc,
        hands,
        setHands,
        handsDup,
        setHandsDup,
        playedHands,
        setPlayedHands,
        playedHandsDup,
        setPlayedHandsDup,
        playedCards,
        setPlayedCards,
        playedCardsDup,
        setPlayedCardsDup,
        contractLevel,
        contractSuit,
        declarer,
        leader,
        setLeader,
        suitLed,
        setSuitLed,
        whoseTurn,
        setWhoseTurn,
        trickCards,
        setTrickCards,
        trickCardsDup,
        setTrickCardsDup,
        currentWinningCard,
        setCurrentWinningCard,
        currentWinningPlayer,
        setCurrentWinningPlayer,
        storedStates,
        setStoredStates,
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
        broadcastType,
        setBroadcastType,
        showPlayedCards,
        setShowPlayedCards,
        auction,
        setAuction,
        explanations,
        setExplanations,
        liveEvents,
        setLiveEvents,
        lastEventTime,
        setLastEventTime,
        timeUntilNextEvent,
        setTimeUntilNextEvent,
        nextEventID,
        setNextEventID,
        auctionEnded,
        takeNextActionAndSchedule,
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

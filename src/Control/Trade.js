export const trade = (
  card,
  hands,
  tradeCard,
  setTradeCard,
  history,
  setHistory
) => {
  if (tradeCard) {
    let tempHands = [...hands];
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
    setHistory([{ action: "trade", cards: [tradeCard, card] }, ...history]);
    setTradeCard(null);
  } else {
    setTradeCard(card);
  }
};

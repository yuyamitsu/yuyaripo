'use strict'

function makeDeck() {
  const suits = ['S', 'H', 'D', 'C'];
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 1; j < 14; j++) {
      deck.push(suits[i] + j);
    }
  }
  return deck;
}

function shuffleCards() { // ランダムに入れ替えた52枚配列を返す
  let randomDeck = [];
  for (let i = 0; i < numberOfCards; ++i) {
    let index = Math.floor(Math.random() * cardDeck.length); //0~52の数字を生成　1ループごとに51，50と減る
    console.log(index);
    randomDeck.push(cardDeck[index]);
    cardDeck.splice(index, 1);
  };
  return randomDeck;
}
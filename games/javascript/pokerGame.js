'use strict';

const gameTable = document.getElementById("gameTable");
const roleName = document.getElementById("roleName");
const cardsDislay = document.querySelectorAll('.cardLabel');
const cardImages = document.querySelectorAll('.cardImage');
const changeBtn = document.getElementById("change");
const checkboxs = document.querySelectorAll('.cardCheck');
const changeStays = document.querySelectorAll('.changeStay');
const resetBtn = document.getElementById("reset");
const scoreNames = document.querySelectorAll(".scoreName");
const scorePoints = document.querySelectorAll(".scorePoint");
const havingPoints = document.getElementById("havingPoints");
const betPoints = document.getElementById("betPoints");

let cardDeck = makeDeck();
let pokerHands = dealingCards();
const defaultPokerChip = 10;
const maxrate = 10;
let rate = 2;
let score = 0;
let rank = 0;


displayCards(pokerHands);
setupCardCheckboxListeners()
resetBtn.addEventListener("click", restartGame);
changeBtn.addEventListener("click", CardChange);

scorePoints.forEach(scorePoint => {
  const point = parseInt(scorePoint.dataset.score);
  scorePoint.textContent = (point * rate);
});

/////////////////カードクリックにイベントを追加する関数/////////////////
function setupCardCheckboxListeners() {
  checkboxs.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        cardImages[index].classList.add('selected');
        changeStays[index].textContent = "かえる";
      } else {
        cardImages[index].classList.remove('selected');
        changeStays[index].textContent = "のこす";
      }
    });
  });
}



/////////////////交換ボタンをクリックしたときの関数/////////////////
function CardChange() {
  // 「かえる／のこす」表示を非表示に
  changeStays.forEach(stay => {
    stay.style.display = "none";
  });

  checkboxs.forEach((checkbox, index) => {
    const img = cardImages[index];
    checkbox.disabled = true;
    if (checkbox.checked) {
      // 新しいカードをデッキから引く
      const newCardIndex = Math.floor(Math.random() * cardDeck.length);
      const newCard = cardDeck.splice(newCardIndex, 1)[0];

      // 手札の更新
      pokerHands[index] = newCard;

      // スライドアニメーションと裏面 → 表面の切り替え
      img.classList.remove("slide-in");
      void img.offsetWidth; // 強制再描画
      img.classList.add("slide-in");
      img.src = `img/cardBack.png`;

      setTimeout(() => {
        img.src = `img/${newCard}.png`;
      }, 400);

      // チェックと選択状態をリセット
      checkbox.checked = false;
      img.classList.remove("selected");
    }
  });

  // ボタンと役名表示の処理
  changeBtn.disabled = true;
  changeBtn.textContent = "交換終了！";
  setTimeout(() => {
    changeBtn.classList.add("none");
    resetBtn.classList.remove("none");
    roleName.textContent = judgeHandRank(pokerHands);
  }, 500);
}

/////////////////リセットボタンをクリックしたときの関数/////////////////
function restartGame() {
  // デッキと手札の再初期化
  cardDeck = makeDeck();
  pokerHands = dealingCards();
  roleName.textContent = "";
  // カード画像の更新
  displayCards(pokerHands);
  // チェックボックスと選択スタイルをリセット
  checkboxs.forEach((checkbox, index) => {
    checkbox.disabled = false;
    checkbox.checked = false;
    cardImages[index].classList.remove('selected');
  });
  // 交換ボタンを再有効化
  changeBtn.disabled = false;
  changeBtn.textContent = "交換する";
  changeStays.forEach(stay => {
    stay.style.display = "block";
    stay.textContent = "のこす";
  });

  changeBtn.classList.remove("none");
  resetBtn.classList.add("none");
}







/////////////////カードを画面表示する関数/////////////////
function displayCards(pokerHands) {
  const delayPerCard = 150; // 各カードの配り間隔（ms）
  const backDuration = 300; // 裏面を見せる時間（ms）
  const totalDelay = pokerHands.length * delayPerCard + backDuration;

  pokerHands.forEach((card, index) => {
    cardImages[index].classList.remove("slide-in");
    setTimeout(() => {
      cardImages[index].src = `img/cardBack.png`;
      cardImages[index].classList.add("slide-in");
    }, index * delayPerCard);
  });

  setTimeout(() => {
    pokerHands.forEach((card, index) => {
      cardImages[index].src = `img/${card}.png`;
    });
    roleName.textContent = judgeHandRank(pokerHands);
  }, totalDelay);
}




/////////////////役を判定する関数/////////////////
function judgeHandRank(hand) {
  const suits = hand.map(card => card[0]);
  const values = hand.map(card => parseInt(card.slice(1)));
  // 数字をソート
  values.sort((a, b) => a - b);
  // 役判定用ヘルパー
  const isFlush = suits.every(s => s === suits[0]);
  const isStraight = values.every((v, i, arr) => i === 0 || v === arr[i - 1] + 1) || (values.toString() === "1,10,11,12,13"); // A-10-J-Q-K
  const counts = {};
  values.forEach(v => counts[v] = (counts[v] || 0) + 1);
  const countValues = Object.values(counts).sort((a, b) => b - a).toString();
  // 判定ロジック
  if (isFlush && values.toString() === "1,10,11,12,13") return 'ロイヤルストレートフラッシュ';
  if (isFlush && isStraight) return 'ストレートフラッシュ';
  if (countValues === "4,1") return 'フォーカード';
  if (countValues === "3,2") return 'フルハウス';
  if (isFlush) return 'フラッシュ';
  if (isStraight) return 'ストレート';
  if (countValues === "3,1,1") return 'スリーカード';
  if (countValues === "2,2,1") return 'ツーペア';
  if (countValues === "2,1,1,1") return 'ワンペア';
  return '役無し';
}
/////////////////最初の手札を配る関数/////////////////
function dealingCards() { // ランダムに5枚の手札配列を返す
  let pokerHands = [];
  for (let i = 0; i < 5; ++i) {
    let index = Math.floor(Math.random() * cardDeck.length); //0~52の数字を生成　1ループごとに51，50と減る
    console.log(index);
    pokerHands.push(cardDeck[index]);
    cardDeck.splice(index, 1);
  };
  return pokerHands;
}
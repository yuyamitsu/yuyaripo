'use strict';

const gameTable = document.getElementById("gameTable");
const resetBtn = document.getElementById("reset");
const numberOfCards = 52;
let openCards = [];

let cardDeck = makeDeck();
let randomDeck = shuffleCards();


for (let i = 0; i < numberOfCards; i++) {
  // ラベル要素の作成
  const label = document.createElement("label");
  label.className = "cardLabel";
  // チェックボックスの作成
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "cardCheck";
  // 画像の作成
  const img = document.createElement("img");
  img.className = "cardImage";
  // ラベルに要素を追加
  label.appendChild(checkbox);
  label.appendChild(img);
  // テーブルに追加
  gameTable.appendChild(label);
}
const cardlabels = document.querySelectorAll('.cardLabel');
const cardImages = document.querySelectorAll('.cardImage');
const checkboxes = document.querySelectorAll('.cardCheck');

checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener('change', () => {
    const img = cardImages[index];
    const card = randomDeck[index];
    if (checkbox.checked) {
      img.src = `img/${card}.png`;
      checkbox.disabled = true;
      openCards.push({ index, card });
      if (openCards.length === 2) {
        const [first, second] = openCards;
        // 数字だけを比較（例："H7" → "7"）
        const num1 = first.card.slice(1);
        const num2 = second.card.slice(1);
        checkboxes.forEach(checkbox => {
          checkbox.disabled = true;
        });
        if (num1 === num2) {
          // 一致：取り除く
          setTimeout(() => {
            cardImages[first.index].style.visibility = "hidden";
            cardImages[second.index].style.visibility = "hidden";
            openCards = [];
            checkboxes.forEach(checkbox => {
              checkbox.disabled = false;
            })
          }, 600);
        } else {
          // 不一致：裏に戻す
          setTimeout(() => {
            checkboxes[first.index].checked = false;
            checkboxes[second.index].checked = false;
            checkboxes.forEach(checkbox => {
              checkbox.disabled = false;
            });
            cardImages[first.index].src = "img/cardBack.png";
            cardImages[second.index].src = "img/cardBack.png";
            openCards = [];
          }, 800);
        }
      }
    }
  });
});

displayCards(randomDeck);
resetBtn.addEventListener("click", restartGame);



function restartGame() {
  // デッキと手札の再初期化
  cardDeck = makeDeck();
  randomDeck = shuffleCards();
  openCards = [];
  // カード画像の更新
  displayCards(randomDeck);
  // チェックボックスと選択スタイルをリセット
  checkboxes.forEach(checkbox => {
    checkbox.disabled = false;
    checkbox.checked = false;
  });
  cardImages.forEach(cardImage => {
    cardImage.style.visibility = "visible";
  })
  console.log("ゲームをリスタートしました！");
}



function displayCards(randomDeck) {
  const delayPerCard = 15; // 各カードの配り間隔（ms）
  randomDeck.forEach((card, index) => {
    cardImages[index].classList.remove("slide-in");
    setTimeout(() => {
      cardImages[index].src = `img/cardBack.png`;
      cardImages[index].classList.add("slide-in");
    }, index * delayPerCard);
  });
}


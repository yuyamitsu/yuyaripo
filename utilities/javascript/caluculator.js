'use strict'

let calculator = document.getElementById('calculator');
let mainDisplay = document.getElementById('mainDisplay');
let subDisplay = document.getElementById('subDisplay');
let symbolDisplay = document.getElementById('symbolDisplay');
let sum = '';
let numbers = document.getElementsByClassName('number');
let symbols = document.getElementsByClassName('symbol');
let func = document.getElementsByClassName('func');
const equal = document.getElementById('btnEqual');
console.log(sum);

////////////////////////数字が押された時の動作////////////////////////
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', function () {
    if (!(this.textContent === '.' && sum.includes('.'))) {
      if (mainDisplay.textContent === "0" && this.textContent === '.') {
        sum = `0${this.textContent}`;
      } else if (mainDisplay.textContent === "0") {
        console.log(sum);
        sum = this.textContent;
      } else {
        sum += this.textContent;
      }
      mainDisplay.textContent = sum; // ← 表示に反映

    }
  });
};
////////////////////////記号が押された時の動作////////////////////////
for (let i = 0; i < symbols.length; i++) {
  symbols[i].addEventListener('click', function () {
    symbolDisplay.textContent = this.textContent;
    if (sum.slice(-1) === '.') { sum = sum.slice(0, -1) }; //sumの末尾が.ならば削除
    mainDisplay.textContent === '0' ? subDisplay.textContent = '0' : subDisplay.textContent = sum; // ← 表示に反映
    mainDisplay.textContent = "0"   //mainDisplayを0に
    sum = "";
  });
};
////////////////////////=(イコール)が押された時の動作////////////////////////
equal.addEventListener('click', function () {
  if (subDisplay.textContent !== '') {
    let main = parseFloat(mainDisplay.textContent);
    let sub = parseFloat(subDisplay.textContent);
    let symbol = symbolDisplay.textContent;
    let result;
    switch (symbol) {
      case '+':
        result = sub + main;
        break;
      case '-':
        result = sub - main;
        break;
      case '*':
        result = sub * main;
        break;
      case '÷':
        main === 0 ? result = 'Error' : result = sub / main;   //0で割ろうとしたらエラー
        break;
    }
    mainDisplay.textContent = String(result);
    subDisplay.textContent = '';
    symbolDisplay.textContent = '';
    sum = '';
  };
});
////////////////////////funcが押された時の動作////////////////////////
for (let i = 0; i < func.length; i++) {
  func[i].addEventListener('click', function () {
    switch (this.textContent) {
      case 'stock1':
        document.getElementById('stock1Display').textContent = mainDisplay.textContent;
        break;
      case 'stock2':
        document.getElementById('stock2Display').textContent = mainDisplay.textContent;
        break;
      case 'AC':
        allClear();
        break;
      case 'C':
        clear();
        break;
    };
  });
};


function allClear() {
  mainDisplay.textContent = '0';
  symbolDisplay.textContent = '';
  subDisplay.textContent = '';
  sum = '';
}
function clear() {
  mainDisplay.textContent = '0';
  sum = '';
}


// キーボード入力に対応するキーイベント処理
window.addEventListener('keydown', function (e) {
  const key = e.key;

  // 数字・小数点
  if ((key >= '0' && key <= '9') || key === '.') {
    document.querySelector(`.number#btn${key}`).click();
  }

  // 記号
  if (key === '+' || key === '-' || key === '*' || key === '/') {
    const btnId = key === '/' ? 'btn÷' : `btn${key}`;
    document.getElementById(btnId)?.click();
  }

  // Enter → イコール
  if (key === 'Enter' || key === '=') {
    document.getElementById('btnEqual').click();
  }

  // Backspace → C（1文字消す機能がないなら0に戻す）
  if (key === 'Backspace') {
    document.getElementById('btnC').click();
  }

  // Escape → AC
  if (key === 'Escape') {
    document.getElementById('btnAC').click();
  }
});


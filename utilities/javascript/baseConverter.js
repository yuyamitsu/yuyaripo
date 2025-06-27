'use strict'
const tbody = document.getElementById('conversionTbody');
const radixList2_16 = [2, 8, 10, 16];   //最初から表示する行の基数 
const baseNum = document.getElementById('baseNum');
const baseRadixSelect = document.getElementById('baseRadixSelect');
const toSelect = document.getElementById('toRadixSelect');
const bases = RadixPreparation();



document.getElementById('conversionBtn').onclick = function () {
  const baseRadixValue = document.getElementById('baseRadixSelect').value;
  const baseNumValue = document.getElementById('baseNum').value;
  const toRadixValue = document.getElementById('toRadixSelect').value;
  const toRadixTextArea = document.getElementById('toRadixTextArea');
  const num = parseInt(baseNumValue, baseRadixValue);

  if (isNaN(num)) {
    alert("入力された値は変換できません。入力内容を確認してください。");
    return;
  }
  radixList2_16.forEach(function (item, index) {     //最初からある行に結果を追加
    document.getElementById(`radix${item}`).textContent = num.toString(item);
  });
  toRadixTextArea.textContent = num.toString(toRadixValue);
};


bases.forEach(function (item, index) {
  const option = document.createElement('option');
  option.setAttribute('value', item);
  if (item === 10) {
    option.setAttribute('selected', 'selected');
  };
  option.textContent = item;
  baseRadixSelect.appendChild(option);
  // toSelect.appendChild(option);
});

bases.forEach(function (item, index) {
  if (![2, 8, 10, 16].includes(item)) {
    const option = document.createElement('option');
    option.setAttribute('value', item);
    if (item === 36) {
      option.setAttribute('selected', 'selected');
    };
    option.textContent = item;
    toSelect.appendChild(option);
  };
});



function RadixPreparation() {
  let bases = [];
  for (let i = 2; i <= 36; ++i) {
    bases[bases.length] = i;
  }
  return bases;
}


console.log(bases);
console.log(baseRadixSelect.value);
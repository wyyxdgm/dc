const fs = require("fs");
const path = require("path");
let txt = fs.readFileSync(path.join(__dirname, "dc.txt")).toString();
const dcbJson = path.join(__dirname, "dcb.json")
const dcbTxt = path.join(__dirname, "dcb.txt")
const dcb500 = path.join(__dirname, "dcb500.txt")
// txt = '\n2370 assurance \n[əˈʃʊərəns] \nn.确保,断言; \n保证,担保 \nHe has a life assurance. \n他投保了人寿保险。 \n2371 bankrupt \n[ˈbæŋkrʌpt] \na.破产的 \nIf the firm cannot sell its products, it will \ngo bankrupt. \n如果公司的产品卖不出去,它就会倒闭。\n'
let regexp = /(\d+)[.]?\s?([~+\w\ ]+)/g; ///(\d+)\s(\w+)\s?\n+\[[^\]]+\]/g;
let re = null;
let arr = new Array(2371 + 1);
// let duplicate = [];
let worlds = new Map();
let ppre = 0;
while ((re = regexp.exec(txt))) {
  let currentNumber = re[1];
  if (ppre + 1 == currentNumber) {
    arr[currentNumber] = re.slice(0, 6);
    ppre++;
    let world = re[2];
    if (worlds.has(world)) {
      worlds.get(world).push(currentNumber);
    }
    else worlds.set(world, []);
  }
}
worlds.forEach((v, k) => {
  if (v.length > 1) console.log('duplicate', k, v);
});
// console.log('duplicate');
// console.log('数据-------------------');
// console.log(arr);
let eArr = [];
for (let index = 1; index < arr.length; index++) {
  const element = arr[index];
  if (!element) {
    eArr.push(index);
  }

}
if (eArr.length) {
  console.log('缺失index--------------');
  console.log(eArr);
}
// let arr2 = arr.map((i, idx) => !i ? idx : false).filter(i => !!i);
// console.log(arr2);
// for (let index = 0; index < array.length - 1; index++) {
//   const element = array[index];
//   const element2 = array[index + 1];
//   if (element[1] + 1 != element2[1]) console.log();
// }

arr.splice(0, 1)
// console.log('单词-arr------------------');
let totalCount = arr.length;
fs.writeFileSync(dcbJson, JSON.stringify(arr));


// console.log('单词-------------------');
fs.writeFileSync(dcbTxt, arr.map(i => i[2].trim()).join(', '))

let group = [];
let groupItem = null;
while ((groupItem = arr.splice(0, 500)).length) {
  group.push(groupItem);
}
let str = '';
group.forEach((gArr, idx) => {
  str += `分组${idx + 1},个数${gArr.length}-------------------\n`;
  str += gArr.map(i => i[2].trim()).join(',') + '\n';
})
fs.writeFileSync(dcb500, str);
console.log('total worlds:', totalCount, `total groups:`, group.length);
console.log('done!');
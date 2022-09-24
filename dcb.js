const fs = require("fs");
const path = require("path");
let txt = fs.readFileSync(path.join(__dirname, "dc.txt")).toString();
// txt = '\n2370 assurance \n[əˈʃʊərəns] \nn.确保,断言; \n保证,担保 \nHe has a life assurance. \n他投保了人寿保险。 \n2371 bankrupt \n[ˈbæŋkrʌpt] \na.破产的 \nIf the firm cannot sell its products, it will \ngo bankrupt. \n如果公司的产品卖不出去,它就会倒闭。\n'
let regexp = /(\d+)[.]?\s?([~+\w]+)/g; ///(\d+)\s(\w+)\s?\n+\[[^\]]+\]/g;
let re = null;
let arr = new Array(2371 + 1);
let ppre = 0;
while ((re = regexp.exec(txt))) {
  if (ppre + 1 == re[1]) {
    arr[re[1]] = re.slice(0, 6);
    ppre++;
  }
}
// console.log('数据-------------------');
// console.log(arr);
console.log('缺失index--------------');
let eArr = [];
for (let index = 0; index < arr.length; index++) {
  const element = arr[index];
  if (!element) eArr.push(index);
}
console.log(eArr);
// let arr2 = arr.map((i, idx) => !i ? idx : false).filter(i => !!i);
// console.log(arr2);
// for (let index = 0; index < array.length - 1; index++) {
//   const element = array[index];
//   const element2 = array[index + 1];
//   if (element[1] + 1 != element2[1]) console.log();
// }

console.log('单词-------------------');
console.log(arr.map(i => i[2]).join(','))

let group = [];
let groupItem = null;
while ((groupItem = arr.splice(0, 500)).length) {
  group.push(groupItem);
}
group.forEach((gArr, idx) => {
  console.log(`分组${idx + 1},个数${gArr.length}-------------------`);
  console.log(gArr.map(i => i[2]).join(','))
})
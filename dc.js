const fs = require("fs");
const path = require("path");
let txt = fs.readFileSync(path.join(__dirname, "dc.txt")).toString();
// txt = '\n2370 assurance \n[əˈʃʊərəns] \nn.确保,断言; \n保证,担保 \nHe has a life assurance. \n他投保了人寿保险。 \n2371 bankrupt \n[ˈbæŋkrʌpt] \na.破产的 \nIf the firm cannot sell its products, it will \ngo bankrupt. \n如果公司的产品卖不出去,它就会倒闭。\n'
// // console.log(`txt`, txt);
// let regexp = /(\d+)\s+(\w+)\s?\n+(\[[^\]]+\])\s?\n([^\[]+)\s?\n([A-Za-z,.\s]+)\s?\n+(\S+)\s?\n/g;
let regexp = /(\d+)\s+(\w+)\s?\n+(\[[^\]]+\])\s?\n([^\[]+)\s?\n([^\u4e00-\u9fa5]+)\s?\n+(\S+[^\d]+)\s?\n/g;
let re = null;
while ((re = regexp.exec(txt))) {
  console.log(`re`, re.slice(0, 6));
}
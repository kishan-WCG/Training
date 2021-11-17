var arry = [9, 9]


var num = arry.join("")
num++;
var arrLenght = 0;


num = num.toString();
num = num.split("");


for (let value of num) {

    let array = Number(value);
    num[arrLenght] = array;
    arrLenght++;
}
console.log(num);
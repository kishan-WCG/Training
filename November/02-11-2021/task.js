var arr = [1, 2, 9]


if (arr[arr.length - 1] != 9)
    arr[arr.length - 1] += 1;
else {
    for (let i = arr.length - 1; i >= 0; i--) {

        if (arr[i] == 9 && arr[i - 1] != 9) {

            if (arr[i - 1] != 9) {
                arr[i - 1] += 1;
                arr[i] = 0;
                break;
            } else {
                arr[i] = 0;
                arr.unshift(1);
            }

        } else {
            arr[i] = 0;
        }
    }
}
console.log(arr);










// var array = function(arr) {
//     arr[arr.length - 1]++;
//     if (arr) {
//         console.log();
//         return
//     }

//     return arr;
// }

// console.log(array(arry));


// var arry = [1, 2, 9]

// var num = Number(arry.join(""))

// var result = num + 1;
// console.log(result.toString().split(""));
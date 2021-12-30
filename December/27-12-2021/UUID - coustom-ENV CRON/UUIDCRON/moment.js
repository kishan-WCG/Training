var moment = require('moment'); // require
// console.log("__________Format Dates____________");
// // Format Dates
// let time = moment().format();
// let time1 = moment().format("MMM Do YY");
// let time2 = moment().format("DDDD");
// console.log(time);
// console.log(time1);
// console.log(time2);

// console.log("__________Relative Time____________");
// // Relative Time
// let time3 = moment("271221", "DDMMYY").fromNow(); // 10 years ago
// let time4 = moment("25082000", "DDMMYYYY").fromNow(); // 10 years ago
// let time5 = moment().startOf('day').fromNow(); // 12 hours ago
// let time6 = moment().endOf('day').fromNow(); // in 12 hours
// let time7 = moment().startOf('hour').fromNow();
// console.log(time3);
// console.log(time4);
// console.log(time5);
// console.log(time6);
// console.log(time7);

// console.log("__________Calendar Time____________");

// let time8 = moment().subtract(10, 'days').calendar(); // 12/18/2021
// let time9 = moment().subtract(6, 'days').calendar(); // Last Wednesday at 12:31 PM
// let time10 = moment().subtract(3, 'days').calendar(); // Last Saturday at 12:31 PM
// let time11 = moment().subtract(1, 'days').calendar(); // Yesterday at 12:31 PM
// let time12 = moment().calendar(); // Today at 12:31 PM
// let time13 = moment().add(1, 'days').calendar(); // Tomorrow at 12:31 PM
// let time14 = moment().add(3, 'days').calendar(); // Friday at 12:31 PM
// let time15 = moment().add(10, 'days').calendar();
// console.log(time8);
// console.log(time9);
// console.log(time10);
// console.log(time11);
// console.log(time12);
// console.log(time13);
// console.log(time14);
// console.log(time15);

// console.log("__________Multiple Locale Support____________");
// let time16 = moment.locale(); // en
// let time17 = moment().format('LT'); // 12:38 PM
// let time18 = moment().format('LTS'); // 12:38:50 PM
// let time19 = moment().format('L'); // 12/28/2021
// let time20 = moment().format('l'); // 12/28/2021
// let time21 = moment().format('LL'); // December 28, 2021
// let time22 = moment().format('ll'); // Dec 28, 2021
// let time23 = moment().format('LLL'); // December 28, 2021 12:38 PM
// let time24 = moment().format('lll'); // Dec 28, 2021 12:38 PM
// let time25 = moment().format('LLLL'); // Tuesday, December 28, 2021 12:38 PM
// let time26 = moment().format('llll'); // Tue, Dec 28, 2021 12:38 PM
// console.log(time16);
// console.log(time17);
// console.log(time18);
// console.log(time19);
// console.log(time20);
// console.log(time21);
// console.log(time22);
// console.log(time23);
// console.log(time24);
// console.log(time25);
// console.log(time26);

// console.log("__________Format Dates -- Guj____________");
// moment.locale("gu");
// let time27 = moment().format('MMMM Do YYYY, h:mm:ss a'); // ડિસેમ્બર ૨૮ ૨૦૨૧, ૧૨:૪૧:૪૦ બપોર
// let time28 = moment().format('dddd'); // મંગળવાર
// let time29 = moment().format("MMM Do YY"); // ડિસે. ૨૮ ૨૧
// let time30 = moment().format('YYYY [escaped] YYYY'); // ૨૦૨૧ escaped ૨૦૨૧
// let time31 = moment().format();

// console.log(time27);
// console.log(time28);
// console.log(time29);
// console.log(time30);
// console.log(time31);

// let DD = moment("25", "DD").fromNow(); // 10 years ago
// let MM = moment("08", "MM").fromNow(); // 10 years ago
// let YY = moment("2000", "YYYY").fromNow(); // 10 years ago


// console.log(DD);
// console.log(MM);
// console.log(YY);

var a = moment();
var b = moment('082000', 'MM-YYYY');
var age = moment.duration(a.diff(b));
var years = age.years();
var months = age.months();
var day = age.days();

let days = "The age is " + years + " years " + months + " months " + day + " Days ";


// console.log(age)
// console.log(years)
// console.log(months)
console.log(days)
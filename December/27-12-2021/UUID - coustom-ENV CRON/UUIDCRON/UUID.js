const uuid = require('uuid');

// V1()
// console.log(uuid.v1());

// V4()
console.log(uuid.v4());

// Check Versions
const v1Uuid = '26dd4470-67a6-11ec-bb3d-07954cfd42aa';
const v4Uuid = '109156be-c4fb-41ea-b1b4-efe1671c5836';

uuid.v1(v1Uuid); // ⇨ false
uuid.v4(v4Uuid); // ⇨ true
// console.log(uuid.v5());
let user = ['kishan', 22, 'ahem', ['male', 'demo1']];

let [name, age, city, [gender, demo]] = user;

console.log(name);
console.log(age);
console.log(city);
console.log(gender);
console.log(demo);
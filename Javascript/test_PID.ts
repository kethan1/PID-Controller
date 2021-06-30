import PID from "./PID.js";

let PID_test = new PID(1);

console.log(PID_test.update(1, 2));
console.log(PID_test.update(2, 1));

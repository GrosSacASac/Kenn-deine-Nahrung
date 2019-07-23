"use strict";

var F = function () {
  "use strict";

  return {
    '+': function _(a, b) {
      return a + b;
    },
    '-': function _(a, b) {
      return a - b;
    },
    '*': function _(a, b) {
      return a * b;
    },
    '/': function _(a, b) {
      return a / b;
    }
  };
}();
/*usage:
var li = [1,2,3,4,5,6,7],
    li2 = li.reduce(F["+"], 0);
console.log(li2); // --> the sum
*/
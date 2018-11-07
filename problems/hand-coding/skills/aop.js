Function.prototype.before = function(beforeFunc) {
  let _this = this;

  return function() {
    beforeFunc.apply(this, arguments);
    return _this.call(this, arguments);
  }
}

Function.prototype.after = function(afterFunc) {
  let _this = this;

  return function() {
    let result = _this.call(this, arguments);
    afterFunc.apply(this, arguments);

    return result;
  }
}

function sayTwo() {
  console.log(2);
}

sayTwo = sayTwo.before(function() {
  console.log(1);
}).after(function() {
  console.log(3);
});

sayTwo();
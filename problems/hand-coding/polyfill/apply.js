Function.prototype._apply = function(context = window, args) {
  context.fn = this;

  let result;

  if (Array.isArray(args)) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }


  delete context.fn;

  return result;
}

var color = 'red';
let obj = {
  color: 'green'
}

function sayColor() {
  console.log(this.color);
}

sayColor(); // red
sayColor.apply(obj); // green
sayColor._apply(obj); // green
Function.prototype._call = function(context = window, ...args) {
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

Function.prototype._bind = function() {
  let _this = this;
  let context = arguments[0];
  let args = [...arguments].slice(1);

  return function F() {
    return _this._call(context, ...args, ...[...arguments]);
  }
}

function getArguments() {
  console.log('this.a', this.a);
  console.log([...arguments]);
}

var a = 1;
var obj = {
  a: 2
}
let func = getArguments._bind(obj, 1, 2);
func(3, 4); // 2   
            // 1 2 3 4
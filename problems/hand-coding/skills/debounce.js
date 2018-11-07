// 防抖
function debounce(func, time) {
  let timeOut;
  time = time || 160

  return function() {
    var context = this, args = arguments;

    clearTimeout(timeOut);
    timeOut = setTimeout(function() {
      func.apply(context, args);
    }, time);
  }
}
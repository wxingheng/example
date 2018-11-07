// 节流
function throttle(func, time) {
  let now = Date.now();
  let interval;
  time = time || 160

  return function() {
    let context = this;
    let triggerTime = Date.now();
    clearTimeout(interval);

    if (triggerTime - now >= time) {
      func.apply(context, arguments);
      now =triggerTime;
    } else {
      interval = setTimeout(function() {
        func.apply(context, arguments);
      }, time);
    }
  }
}
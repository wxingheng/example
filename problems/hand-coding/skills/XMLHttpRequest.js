const ajax = new XMLHttpRequest();

ajax.open('GET', 'http://a.com/api', true);
ajax.send(null);

ajax.onreadystatechange = function() {
  if (ajax.readyState === 4 && ajax.status >= 200 && ajax.status <= 304) {
    console.log(ajax.responseText);
  }
}

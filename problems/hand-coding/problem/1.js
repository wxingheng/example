let a = {
  a: {
    b: {
      c : 1, 
      f: 5
    }, 
    e: 3
  }, 
  g: {
    s: 1
  },
  d: 2
};

function flat(obj) {
  let result = {};

  for (let property in obj) {
    if (Object.prototype.toString.call(obj[property]).slice(8, -1) === 'Object') {
      let tempObj = flat(obj[property]);
      result = {...result, ...tempObj};
    } else {
      result[property] = obj[property]
    }
  }

  return result;
}

console.log(flat(a));
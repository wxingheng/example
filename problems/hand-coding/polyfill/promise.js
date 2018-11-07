function _Promise(executor) {
  this.state = 'pending';
  this.data = undefined;
  this.resolve = null;
  this.resolveCallbackArray = [];
  this.rejectCallbackArray = [];

  let resolve = (data) => {
    this.state = 'resolve';
    this.data = data;
    this.resolveCallbackArray.forEach(cb => cb());
  }

  let reject = (reason) => {
    this.state = 'reject';
    this.data = reason;
    this.rejectCallbackArray.forEach(cb => cb());
  }

  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error);
  }
}

_Promise.prototype.then = function(onResolved, onRejected) {
  let promise2;
  let _this = this;

  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err;}
  
  if (this.state === 'resolve') {
    promise2 = new _Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onResolved(_this.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  if (this.state === 'reject') {
    promise2 = new _Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(_this.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  if (this.state === 'pending') {
    promise2 = new _Promise((resolve, reject) => {
      _this.resolveCallbackArray.push(() => {
        setTimeout(() => {
          try {
            let x = onResolved(_this.data);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      })

      _this.rejectCallbackArray.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(_this.data);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      })
    });
  }

  return promise2;
}

_Promise.prototype.catch = function(onRejected) {
  return this.then(null,onRejected)
}

//resolve方法
_Promise.prototype.resolve = function(val){
  return new _Promise((resolve,reject)=>{
    resolve(val)
  })
}
//reject方法
_Promise.prototype.reject = function(val){
  return new _Promise((resolve,reject)=>{
    reject(val)
  })
}

//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
_Promise.prototype.all = function(promises){
  let arr = []
  let i = 0
  function processData(index,data){
    arr[index] = data
    i++
    if(i == promises.length){
      resolve(arr)
    }
  }
  return new _Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(data=>{
        processData(i,data)
      },reject)
    }
  })
}

_Promise.prototype.race = function(promises){
  return new _Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(resolve,reject)
    }
  })
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    reject('error');
  }

  if (x instanceof _Promise) {
    let called;

    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if (called) return;
          called = true;
          reject(err);
        })
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

function func() {
  return new _Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, 3000);
  })
}

func().then((data) => {
  console.log('1111111111111');
  console.log('data ', data);
  return '222';
}).then((data) => {
  console.log('222222');
  console.log('data ', data);
  return _Promise.reject('eeeeeeeee');
}).then((data) => {
  console.log('33333');
  console.log('data ', data);
}).catch((error) => {
  console.log('error---', error);
})

console.log('before');
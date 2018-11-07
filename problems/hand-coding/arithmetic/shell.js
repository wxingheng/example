let array = [1, 2, 66, 4, 3, 5, 8, 7, 6, 7, 8, 9, 5];

function swap(array, i, j) {
  [array[i], array[j]] =  [array[j], array[i]];
}
// 希尔排序
function shell(array) {
  let h = 0;
  let length = array.length;

  while(h < length/3)  {
    h = h*3+1;
  }

  while(h>=1) {
    for (let i = h; i < length; i++) {
      for (let j = i; j >= h && array[j] < array[j-h]; j=j-h) {
        swap(array, j, j-h);
      }
    }

    h = (h-1)/3;
  }
}

shell(array);

console.log('array ', array);

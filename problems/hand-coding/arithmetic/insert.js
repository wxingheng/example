let array = [1,2,66,4,3,5,8,7,6,7,8,9,5];

function swap(array, i, j) {
  [array[i], array[j]] =  [array[j], array[i]];
}

// 插入排序
function insert(arr) {
  let length = arr.length;

  for (let i = 0; i<length-1; i++) {
    let min = arr[i];
    let minIndex = i;
    for (let j = i+1; j<length; j++) {
      if (arr[j] < min) {
        min = arr[j];
        minIndex = j;
      }
    }
    swap(arr, i, minIndex);
  }
}

insert(array);

console.log('array ', array);
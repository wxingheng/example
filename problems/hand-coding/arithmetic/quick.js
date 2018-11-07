let array_1 = [1, 2, 66, 4, 3, 5, 8, 7, 6, 7, 8, 9, 5];

function swap(array, i, j) {
  [array[i], array[j]] =  [array[j], array[i]];
}
// 快速排序
// function quickSort(array) {
//   if(array.length < 1){
//     return;
//   }
//   var pivot;
//   var index = 
//   var left=[],right=[];array.splice(pivot,1)/2[0];
//   for(var i = 0;i<array.length; i++){
//       if(array[i]< index){
//         left.push(array[i])
//       }else{
//         right.push(array[i])
//       }
//     }
//     return quickSort(left[i],index,right[i])
//   }

function quick(low, high, array) {
  if (low >= high) return;

  let middleIndex = low;
  let middle = array[low];

  for (let i = low+1; i <= high; i++) {
    if (array[i] < middle) {
      
      let target = array.splice(i, 1)[0];
      array.splice(middleIndex, -1, target);
      middleIndex++;
    }
  }

  quick(low, middleIndex-1, array);
  quick(middleIndex+1, high, array);
}

quick(0, array_1.length-1, array_1);

console.log('array ', array_1);


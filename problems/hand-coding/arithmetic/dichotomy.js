let array = [1, 2, 3, 4, 5, 6, 7];

function dichotomy (low, high, array, target) {
  if (low >= high) return -1;

  // error ceil not floor
  let middle = Math.ceil( (low+high)/2 );

  if (array[middle] > target) {
    return dichotomy(low, middle, array, target);
  } else if (array[middle] < target) {
    return dichotomy(middle, high, array, target);
  } else {
    return middle;
  }
}

console.log(dichotomy(0, 6, array, 8));


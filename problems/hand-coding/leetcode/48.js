/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  let n = matrix.length - 1;
  let length = n;
  
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let x = i;
      let y = j;
      let current = matrix[i][j];

      for (let k = 0; k <= 3; k++) {
        console.log('x ', x, ' y ', y, ' current ', current, ' x ', y, ' y ', n-x, ' swap ', matrix[y][n-x]);
        let swap = matrix[y][length-x];
        matrix[y][length-x] = current;
        current = swap;
        
        let temp = x;
        x = y;
        y = length-temp;
      }
    }
    n--;
  }
};

let matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]];

rotate(matrix);

console.log(matrix);
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
  let numbers = 0;
  let preNums = 0;
  
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (board[x][y] !== '.') {
        numbers++;
        board[x][y] = Number(board[x][y]);
      }
    }
  }

  preNums = numbers;

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (typeof board[x][y] !== 'number') {
        board[x][y] = getPossible(board, x, y);
        if (typeof board[x][y] === 'number') {
          numbers++;
        }
      }

      if (x === 8 && y === 8 && numbers > preNums) {
        x = -1;
        preNums = numbers;
      }
    }
  }
  
  // for (let x = 0; x < 9; x++) {
  //   for (let y = 0; y < 9; y++) {
  //     board[x][y] = board[x][y]+'';
  //   }
  // }

};

function getPossible (board, x, y) {
  let result = [];
  let finallyResult = [];
  let x1 = Math.floor(x/3);
  let y1 = Math.floor(y/3);

  for(let i = 0; i < 9; i++) {
    if (typeof board[x][i] === 'number') {
      result.push(board[x][i]);
    }

    if (typeof board[i][y] === 'number') {
      result.push(board[i][y]);
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (typeof board[x1*3+i][y1*3+j] === 'number' ) {
        result.push(board[x1*3+i][y1*3+j]);
      }
    }
  }

  for (let i = 0, len = result.length; i < len; i++) {
    for (let j = i+1; j < len; j++) {
      if (result[i] === result[j]) {
        result.splice(i, 1);
        i--;
        j--;
        len--;
      }
    }
  }

  for (let i = 1; i < 10; i++) {
    if (result.indexOf(i) < -0.5) {
      finallyResult.push(i);
    }
  }

  return finallyResult.length === 1 ? finallyResult[0] : finallyResult;
}

let test = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
];

// let test = [
//   ["5","3",".", ".","7",".", ".",".","."],
//   ["6",".",".", "1","9","5", ".",".","."],
//   [".","9","8", ".",".",".", ".","6","."],

//   ["8",".",".", ".","6",".", ".",".","3"],
//   ["4",".",".", "8","5","3", ".",".","1"],
//   ["7",".",".", "9","2",".", ".",".","6"],

//   [".","6",".", ".","3","7", "2","8","4"],
//   [".",".",".", "4","1","9", ".","3","5"],
//   [".",".",".", ".","8",".", ".","7","9"]
// ];

solveSudoku(test);
console.log(test)
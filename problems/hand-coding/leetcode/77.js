/**
 * @desc 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    let result = [];

    test([], 0, 1, result, n, k);

    return result;
};

function test(current, length, start, result, n, k) {
  if (length === k) {
    result.push(current);
  } else {
    for (let i = start; i <= n; i++) {
      let tempCurrent = [...current, i];
      test(tempCurrent, length+1, i+1, result, n, k); 
    }
  }

  return;
}

console.log(combine(5, 2));
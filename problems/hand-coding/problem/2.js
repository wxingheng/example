let a = [1, 2, 3, 3, 2, 1, 3, 1, 2, 2, 4, 5, 4];

// 双层for循环 去掉不同的
// for (let i = 0, len = a.length; i < len; i++) {
//   for (let j = i+1; j < len; j++) {
//     if (a[i] === a[j]) {
//       a.splice(j, 1);
//       i--;
//       j--;
//       len--;
//     }
//   }
// }

// 单层for循环 加上indexOf
// for (let i = 0, len = a.length; i < len; i++) {
//   if (a.indexOf(a[i]) < i) {
//     a.splice(i, 1);
//     i--;
//     len--;
//   }
// }

console.log(a);
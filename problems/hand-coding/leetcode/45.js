/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let index = 0;
    let length = nums.length-1;
    let result = 0;

    while(index < length) {
      let max = 0; // 最大值
      let nextIndex = index; // 下一次的索引

      for (let i = 0, len = nums[index]; i <= len; i++) {
        if (i + nums[index+i] > max) {
          max = index + i + nums[index+i];
          if (i !== 0) {
            nextIndex = index + i;
          } else {
            nextIndex = index + nums[index];
          }
          if (max >= length) {
            break;
          }
        }
      }

      index = nextIndex;
      result++;
    }

    return result;
};

console.log(jump([2,3,1,1,4]))
console.log(jump([3,2,1]));
console.log(jump([1,2]));
console.log(jump([1,1,1,2,1]));
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let result = []; // result[i]以num[i]为最后一个数的最大序数和
    let max = nums[0];
    result.push(nums[0]);

    for (let i = 1, len = nums.length; i < len; i++) {
      if (result[i-1] > 0) {
        result[i] = result[i-1] + nums[i];
      } else {
        result[i] = nums[i];
      }

      if (result[i] > max) {
        max = result[i];
      }
    }

    return max;
};
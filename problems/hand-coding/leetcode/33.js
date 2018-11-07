/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let low = 0;
  let high = nums.length -1;

  while (low <= high) {
    let mid = Math.floor((low+high)/2);

    if (nums[mid] === target) {
      return mid;
    // 左边有序
    } else if (nums[mid] > nums[low]) {
      if (nums[low] <= target && nums[mid] >= target) {
        high = mid;
      } else {
        low = mid+1;
      }
    // 右边有序  
    } else if (nums[mid] < nums[high]) {
      if (nums[mid] <= target && nums[high] >= target && mid > low) {
        low = mid;
      } else {
        high = mid-1;
      }
    } else {
      return -1;
    }
  }

  return -1;
};

console.log(search([4], 4));
console.log(search([4], -4));
console.log(search([1, 3], 2));
console.log(search([1, 3], 3));
console.log(search([4,5,6,7,0,1,2], 1));
console.log(search([4,5,6,7,0,1,2], -1));
console.log(search([4,5,6,7,0,1,2], 4));
console.log(search([4,5,6,7,0,1,2], 5));
console.log(search([4,5,6,7,0,1,2], 6));
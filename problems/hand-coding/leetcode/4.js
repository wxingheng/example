/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  let len1 = nums1.length;  
  let len2 = nums2.length;
  let result = [];
  let temp = 0;
  let mid = (len1+len2)/2;
  let hasTwo = mid%1 === 0.5 ? false : true;
  let i = 0;
  let j = 0;  

  while(i < len1 || j < len2) {
    if (i+j <= mid) {
      if (nums1[i] <= nums1[j]) {
        result.push(nums1[i]);
        i++;
      } else {
        result.push(nums2[j]);
        j++;
      }
    } else {
      break;
    }
  }

  if (hasTwo) {
    temp = (result[mid] + result[mid-1])/2;
  } else {
    temp = result[mid-0.5];
  }

  return temp;
};

console.log(findMedianSortedArrays([1], [1]));
console.log(findMedianSortedArrays([1], [1, 2]));
console.log(findMedianSortedArrays([], [1, 2]));
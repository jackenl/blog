/*
 * @lc app=leetcode id=213 lang=javascript
 *
 * [213] House Robber II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if (nums === null || nums.length === 0) {
    return 0;
  }
  if (nums.length === 1) {
    return nums[0];
  }
  const n = nums.length;
  return Math.max(newRob(nums, 0, n - 2), newRob(nums, 1, n - 1));
};

var newRob = function(nums, first, last) {
  let pre1 = 0, pre2 = 0;
  for (let i = first; i <= last; i++) {
    let cur = Math.max(pre1 + nums[i], pre2);
    pre1 = pre2;
    pre2 = cur;
  }
  return pre2;
}
// @lc code=end


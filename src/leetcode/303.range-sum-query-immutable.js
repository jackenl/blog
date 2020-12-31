/*
 * @lc app=leetcode id=303 lang=javascript
 *
 * [303] Range Sum Query - Immutable
 */

let sums;
// @lc code=start
/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    const n = nums.length;
    sums = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
      sums[i] = sums[i - 1] + nums[i - 1];
    }
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
  return sums[j + 1] - sums[i];
};

/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
// @lc code=end


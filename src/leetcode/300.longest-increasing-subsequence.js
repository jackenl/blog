/*
 * @lc app=leetcode id=300 lang=javascript
 *
 * [300] Longest Increasing Subsequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  const n = nums.length;
  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    let max = 1;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        max = Math.max(max, dp[j] + 1);
      }
    }
    dp[i] = max;
  }
  return dp.reduce((pre, cur) => {
    return Math.max(pre, cur);
  }, 0);
};
// @lc code=end


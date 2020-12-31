/*
 * @lc app=leetcode id=70 lang=javascript
 *
 * [70] Climbing Stairs
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  if (n <= 2) {
    return n;
  }
  let pre1 = 1, pre2 = 2;
  for (let i = 2; i < n; i++) {
    let cur = pre1 + pre2;
    pre1 = pre2;
    pre2 = cur;
  }
  return pre2;
};
// @lc code=end


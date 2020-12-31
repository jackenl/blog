/*
 * @lc app=leetcode id=413 lang=javascript
 *
 * [413] Arithmetic Slices
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {number}
 */
var numberOfArithmeticSlices = function(A) {
  if (A === null || A.length < 3) {
    return 0;
  }
  const n = A.length;
  const dp = new Array(n).fill(0);
  for (let i = 2; i < n; i++) {
    if (A[i] - A[i - 1] === A[i - 1] - A[i - 2]) {
      dp[i] = dp[i - 1] + 1;
    }
  }
  let total = 0;
  for (let i = 2; i < n; i++) {
    total += dp[i];
  }
  return total;
};
// @lc code=end


/*
 * @lc app=leetcode id=343 lang=javascript
 *
 * [343] Integer Break
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
  if (n === 0) {
    return 0;
  }
  let dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i - 1; j++) {
      dp[i] = Math.max(dp[i], Math.max(j * dp[i - j], j * (i - j)));
    }
  }
  return dp[n];
};
// @lc code=end


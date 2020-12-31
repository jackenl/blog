/*
 * @lc app=leetcode id=64 lang=javascript
 *
 * [64] Minimum Path Sum
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  if (grid.length === 0 && grid[0].length === 0) {
    return 0;
  }
  const m = grid.length, n = grid[0].length;
  const dp = new Array(n);
  dp[0] = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (j === 0) {
        dp[j] = dp[j];
      } else if (i === 0) {
        dp[j] = dp[j - 1];
      } else {
        dp[j] = Math.min(dp[j], dp[j - 1]);
      }
      dp[j] += grid[i][j];
    }
  }
  return dp[n - 1];
};
// @lc code=end


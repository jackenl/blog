/*
 * @lc app=leetcode id=91 lang=javascript
 *
 * [91] Decode Ways
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  if (s === null || s.length === 0) {
    return 0;
  }
  const n = s.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = s.charAt(0) === '0' ? 0 : 1;
  for (let i = 2; i <= n; i++) {
    let one = Number(s.substring(i - 1, i));
    if (one !== 0) {
      dp[i] += dp[i - 1];
    }
    if (s.charAt(i - 2) === '0') {
      continue;
    }
    let two = Number(s.substring(i - 2, i));
    if (two <= 26) {
      dp[i] += dp[i - 2];
    }
  }
  return dp[n];
};
// @lc code=end


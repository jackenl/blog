/*
 * @lc app=leetcode id=279 lang=javascript
 *
 * [279] Perfect Squares
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  let dp = new Array(n + 1).fill(0);
  const squareList = generateSquareList(n);
  for (let i = 1; i <= n; i++) {
    let min = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j < squareList.length; j++) {
      if (squareList[j] > i) {
        break;
      }
      min = Math.min(min, dp[i - squareList[j]] + 1);
    }
    dp[i] = min;
  }
  return dp[n];
};

var generateSquareList = function(n) {
  let square = 1;
  let diff = 3;
  const list = [];
  while (square <= n) {
    list.push(square);
    square += diff;
    diff += 2;
  }
  return list;
}
// @lc code=end


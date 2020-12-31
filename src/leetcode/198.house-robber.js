/*
 * @lc app=leetcode id=198 lang=javascript
 *
 * [198] House Robber
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    let pre1 = 0, pre2 = 0;
    for (let i = 0; i < nums.length; i++) {
      let cur = Math.max(pre1 + nums[i], pre2);
      pre1 = pre2;
      pre2 = cur;
    }
    return pre2;
};
// @lc code=end


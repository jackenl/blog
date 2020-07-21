const swap = require("../../utils/swap");

/**
 * 选择排序
 * 时间复杂度O(n^2)，空间复杂度O(1)
 */
function selectSort(arr) {
  var minIndex;
  var len = arr.length;

  for (var i = 0; i < len - 1; i++) {
    minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    swap(arr, i, minIndex);
  }

  return arr;
}

// 测试
var arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(selectSort(arr));
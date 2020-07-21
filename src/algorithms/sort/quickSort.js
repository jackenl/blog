const swap = require("../../utils/swap");

/**
 * 快速排序
 * 事件复杂度O(n log n)，空间复杂度O(log n)
 */
function quickSort(arr, left, right) {
  if (left < right) {
    var pivot = partition(arr, left, right); // 获取切分基准值

    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
  }

  return arr;
}

function partition(arr, left, right) {
  var pivot = left; // 以第一元素为基准

  for (var i = left + 1; i <= right; i++) {
    if (arr[i] < arr[left]) {
      pivot += 1;
      swap(arr, i, pivot);
    }
  }
  swap(arr, left, pivot);

  return pivot;
}

// 测试
var arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(quickSort(arr, 0, arr.length - 1));
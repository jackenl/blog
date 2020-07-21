const swap = require("../../utils/swap");

/**
 * 堆排序
 */
function heapSort(arr) {
  var len = arr.length;

  // 初始化堆，i 从最后一个父节点开始调整，直到节点均调整完毕
  for (var i = Math.floor(len / 2) - 1; i >= 0; i--) {
    heapify(arr, i, len);
  }

  // 堆排序：先将第一个元素和最后一个元素交换，再基于前n-1项进行堆化，重复以上操作
  for (var i = len - 1; i > 0; i--) {
      swap(arr, 0, i);
      len--;
      heapify(arr, 0, len);
  }

  return arr;
}

function heapify(arr, index, size) {
  var largest = index;
  var left = 2 * index + 1, right = 2 * index + 2;
  
  if (left < size && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < size && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== index) {
    swap(arr, index, largest);
    heapify(arr, largest, size);
  }
}

// 测试
let arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(heapSort(arr));
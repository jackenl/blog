/**
 * 希尔排序
 */
function shellSort(arr) {
  var len = arr.length;
  var gap = 1;
  while (gap < len / 5) { // 动态定义间隔序列
    gap = gap * 5 + 1;
  }

  for (gap; gap > 0; gap = Math.floor(gap / 5)) {
    for (var i = gap; i < len; i++) {
      var temp = arr[i];
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j];
      }
      arr[j + gap] = temp;
    }
  }

  return arr;
}

// 测试
var arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(shellSort(arr));
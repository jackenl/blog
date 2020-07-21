/**
 * 插入排序
 * 事件复杂度O(n^2)，空间复杂度O(1)
 */
function insertSelect(arr) {
  if (arr.length < 2) return arr;

  var len = arr.length;
  for (var i = 1; i < len; i++) {
    var temp = arr[i];
    var j = i - 1;
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j]
      j--;
    }
    arr[j + 1] = temp;
  }

  return arr;
}

// 测试
var arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(insertSelect(arr));
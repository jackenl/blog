/**
 * 归并排序
 */
function mergeSort(arr) {
  var len = arr.length;
  if (len < 2) {
    return arr;
  }

  var middle = Math.floor(len / 2);
  var left = arr.slice(0, middle);
  var right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];
    var i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    while (i < left.length)
        result.push(left[i++]);

    while (j < right.length)
        result.push(right[j++]);

    return result;
}

// 测试
var arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(mergeSort(arr));

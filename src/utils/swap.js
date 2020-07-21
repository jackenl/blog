/**
 * 数组元素交换
 * @param {[]any} arr 
 * @param {number} index1 
 * @param {number} index2 
 */
function swap(arr, index1, index2) {
  if (!Array.isArray(arr) || typeof index1 !== 'number' || typeof index2 !== 'number') {
    return;
  }
  
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

module.exports = swap;

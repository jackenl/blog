/**
 * 最小堆
 */
class MinHeap {
  heap = [];

  constructor(arr) {
    // 构建最大堆
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      this.shiftDown(i);
    }
  }

  // 获取堆元素个数
  size() {
    return this.heap.length;
  }

  // 判断堆是否为空
  isEmpty() {
    return this.heap.length === 0;
  }

  // 插入堆元素
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }

  // 弹出堆顶元素
  extractMin() {
    if (this.heap.length === 0) return;
    this.swap(0, this.heap.length - 1);
    const top = this.heap.pop();
    this.shiftDown(0);
    return top;
  }

  // 获取堆顶元素
  getMin() {
    if (this.heap.length > 0) {
      return this.heap[0];
    }
  }

  // 根据索引互换堆元素
  swap(i, j) {
    const tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }

  // ********* 核心辅助函数 **********

  // 向上堆化（节点元素上移）
  shiftUp(index) {
    let pIndex = (index - 1) >> 2;
    while (index > 0 && this.heap[pIndex] > this.heap[index]) {
      this.swap(pIndex, index);
      index = pIndex;
      pIndex = (index - 1) >> 2;
    }
  }

  // 向下堆化（节点元素下移）
  shiftDown(index) {
    let next = index * 2 + 1;
    while (next < this.heap.length) {
      if (next < this.heap.length - 1 && this.heap[next] > this.heap[next + 1]) {
        next += 1;
      }
      if (arr[next] > arr[index]) break;
      this.swap(index, next);
      index = next;
      next = 2 * index + 1;
    }
  }
}

module.exports = MinHeap;

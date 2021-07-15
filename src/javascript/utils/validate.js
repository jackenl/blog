/**
 * 判断是否是 symbol 类型
 * @param val 需要判断的值 
 */
export function isSymbol(val) {
  return typeof val === 'symbol';
}

/**
 * 判断是否可序列化
 * @param data 需要判断的值
 */
export function hasStringify(data) {
  if (data === 'undefined') {
    return false;
  }

  if (data instanceof Function) {
    return false;
  }

  if (isSymbol(data)) {
    return false;
  }

  return true;
}
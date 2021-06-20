function myInstanceof(target, origin) {
  if (typeof target !== 'object' || target === null) return false;
  let proto = Object.getPrototypeOf(target);
  while (proto) {
    if (proto === origin.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

// test
const a = [1, 2, 3];
console.log(myInstanceof(a, Array));
console.log(myInstanceof(a, Object));

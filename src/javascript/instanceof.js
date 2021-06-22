function instanceOf(target, origin) {
  if (typeof target !== 'object' || target === null) return false;
  let proto = target.__proto__;
  while (true) {
    if (proto === null) return false;
    if (proto === origin.prototype) return true;
    proto = proto.__proto__;
  }
}

// test
const a = [1, 2, 3];
console.log(instanceOf(a, Array));
console.log(instanceOf(a, Object));

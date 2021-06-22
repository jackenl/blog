Object.create = function (proto, propertyObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null');
  }
  if (propertyObject === null) {
    new TypeError('Cannot convert undefined or null to object');
  }
  function F() {}
  F.prototype = proto;
  const obj = new F();
  if (propertyObject !== undefined) {
    Object.defineProperties(obj, propertyObject);
  }
  if (proto === null) {
    obj.__proto__ = null;
  }
  return obj;
};

const o = Object.create({}, { p: { value: 42 } });
console.log(o.p);
o.p = 24;
console.log(o.p);

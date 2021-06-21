function render(template, data) {
  const reg = /\{\{(\w+)\}\}/;
  if (reg.test(template)) {
    const name = reg.exec(template)[1];
    template = template.replace(reg, data[name]);
    return render(template, data); // 递归替换字符串
  }
  return template;
}

// test
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let person = {
  name: 'Jake',
  age: 12
};
const res = render(template, person);
console.log(res);

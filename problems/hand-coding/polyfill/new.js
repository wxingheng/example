function _new(func) {
  // 创建一个空对象
  let obj = new Object();
  // 获取构造函数
  let Con = [].shift.call(arguments);
  // 链接到原型
  obj.__proto__ = Con.prototype;
  // 调用构造函数
  let result = Con.apply(obj, arguments);
  // 返回结果
  return typeof result === 'object' ? result : obj
}
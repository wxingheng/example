// 寄生组合继承
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function() {
  console.log('name ', this.name);
}

function Child(Parent, name, age) {
  Parent.call(this, name);
  this.age = age;
}

extendPrototype(Child, Parent);

function extendPrototype(child, parent) {
  let prototype = Object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

Child.prototype.sayAge = function() {
  console.log('age ', this.age);
}

console.log(new Child(Parent, 'name', 12));
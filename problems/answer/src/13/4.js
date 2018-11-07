function Event(){
  this.tasks = {};
}

Event.prototype.on = function(name, fn) {
  if (!this.tasks[name]) {
    this.tasks[name] = fn;
  }
}

Event.prototype.off = function(name) {
  if (this.tasks[name]) {
    delete this.tasks[name];
  }
}

Event.prototype.trigger = function(name) {
  if (this.tasks[name]) {
    this.tasks[name]();
  }
}
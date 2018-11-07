const RED = true;
const BLACK = false;

class _Node {
  constructor(key, value, N, color) {
    this.key = key; // 键
    this.value = value; // 值
    this.left = null; // 指向子树的链接
    this.right = null // 指向子树的链接
    this.color = color // 其父节点指向它的链接的颜色
    this.N = N || 1; // 以该节点为根的子树中的结点数
  }
}

class RedBlackBST {
  constructor(node) {
    this.root = node;
  }

  // size rotateLeft rotateRight flipColors put deleteMin delete keys
  isRed(x) {
    if (x == null) return false;
    else return x.color === RED;
  }
  size(x) {
    if (x == null) return 0;
    else return x.N;
  }

  // ???
  // 需要把x但会然后改变指向
  rotateLeft(h) {
    if (h.right == null) return;
    x = h.right;
    h.right = x.left;
    x.left = h;
    x.color = h.color;
    h.color = RED;
    x.N = h.N;
    h.N = 1 + this.size(h.left) + this.size(h.right);

    return x;
  }

  rotateRight(h) {
    if (h.left == null) return;
    x = h.left;
    h.left = x.right;
    x.right = h;
    x.color = h.color;
    h.color = RED;
    x.N = h.N;
    h.N = 1 + this.size(h.left) + this.size(h.right);

    return x;
  }

  // 4-节点 转化为 两个2-节点
  flipColors(h) {
    h.color = RED;
    h.left.color = BLACK;
    h.right.color = BLACK;
  }

  // ???
  put(key, val, h = this.root) {
    if (h == null) return new _Node(key, val, 1, RED);

    let cmp = compareTo(key, h.key);

    if (cmp < 0)      h.left = this.put(key, val, h.left);
    else if (cmp > 0) h.right = this.put(key, val, h.right);
    else              h.value = val;

    if (this.isRed(h.right) && !this.isRed(h.left))    h = this.rotateLeft(h);
    if (this.isRed(h.left) && this.isRed(h.left.left)) h = this.rotateRight(h);
    if (this.isRed(h.left) && this.isRed(h.right))     this.flipColors(h);

    h.N = this.size(h.left) + this.size(h.right) + 1;

    return h;
  }

  deleteMin() {

  }

  deleteMax() {

  }

  delete() {

  }
}

function compareTo(a, b) {  
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}
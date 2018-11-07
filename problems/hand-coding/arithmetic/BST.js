class _Node {
  constructor(key, value, N) {
    this.key = key; // 键
    this.value = value; // 值
    this.left = null; // 指向子树的链接
    this.right = null // 指向子树的链接
    this.N = N || 1; // 以该节点为根的子树中的结点数
  }
}

class BST {
  constructor(node) {
    this.root = node;
  }

  size(node) {
    if (node instanceof _Node) {
      return node ? node.N : this.root.N;
    } else {
      return 0;
    }
  }

  // 查找节点
  get(key, x = this.root) {
    if (x == null) return;
    if (key > x.key) {
      return this.get(key, x.right);
    } else if (key < x.key) {
      return this.get(key, x.left);
    } else {
      return x;
    }
  }

  // 添加节点
  // ???
  put (key, value, x = this.root) {
    // 如果存在结点的key 则更新value
    // 否则创建一个新节点
    if (x == null) return new _Node(key, value, 1);

    if (key < x.key) {
      x.left = this.put(key, value, x.left);
    } else if (key > x.key) {
      x.right = this.put(key, value, x.right);
    } else {
      x.value = value;
    }

    x.N = this.size(x.left) + this.size(x.right) + 1; 
    return x;
  }

  min(x = this.root) {
    if (x.left == null) return x;
    else return this.min(x.left);
  }

  max(x = this.root) {
    if (x.right == null) return x;
    else return this.max(x.right);
  }

  // 小于等于
  // ???
  floor(key, x = this.root) {
    if (x == null) return null;

    let cmp = compareTo(key, x.key);

    if (cmp === 0) return x;
    if (cmp < 0) return this.floor(key, x.left);

    let t = this.floor(key, x.right);

    if (t !== null) return t;
    else            return x; 
  }

  // 大于等于
  // ???
  ceiling(key, x = this.root) {
    if (x == null) return null;
    
    let cmp = compareTo(key, x.key);

    if (cmp === 0) return x;
    if (cmp > 0) return this.ceiling(key, x.right);

    let t = this.ceiling(key, x.left);

    if (t !== null) return t;
    else            return x;
  }

  // 返回排名为k的节点
  select(k, node = this.root) {
    if (!node || k > node.N) return null;
    
    let  center = getValue([node, 'left', 'N'], 0)+1;

    let cmp = compareTo(k, center);
    
    if (cmp > 0) {
      return this.select(k-center, node.right);
    } else if (cmp < 0) {
      return this.select(k, node.left);
    } else {
      return node;
    }
  }

  // 返回x为根节点的子树中小于x.key的键的数量
  // ???
  rank(key, x = this.root) {
    if (node == null) return null;
    let cmp = compareTo(key, x.key);

    if (cmp < 0) return this.rank(key, x.left);
    else if (cmp > 0) return 1 + this.size(x.left) + this.size(x.right);
    else return this.size(x.left);
  } 

  // 删除最小节点
  // ???
  deleteMin(x = this.root) {
    if (x.left == null) return x.right;

    x.left = this.deleteMin(x.left);
    x.N = this.size(x.left) + this.size(x.right) + 1;
    return x;
  }
  // 删除节点
  // ???
  delete(key, x = this.root) {
    if (node == null) return null;
    let cmp = compareTo(key, x.key);

    if (cmp > 0) x.right = this.delete(key, x.right);
    else if (cmp < 0) x.left = this.delete(key, x.left);
    else {
      if (x.left == null) return x.right;
      if (x.right == null) return x.left;
      let t = x;
      // H节点
      x = this.min(t.right);
      // 删掉H节点 并返回t.right的根节点
      x.right = this.deleteMin(t.right);
      // x.left 没有错 
      x.left = t.left;
      // 之后由于递归 x就成为了 上一层递归的 x.right 或者 x.left
    }

    x.N = this.size(x.left) + this.size(x.right) + 1;
    return x;
  }

  // 二叉查找树的范围查找
  // ???
  keys(low, high, x = this.node, queue = []) {
    if (x == null) return;
    
    let lowCmp = compareTo(low, x.key);
    let highCmp = compareTo(high, x.key);
    if (lowCmp<0) this.keys(low, high, x.left, queue);
    if (highCmp>0) this.keys(low, high, x.right, queue);
    if (lowCmp<=0 && highCmp>=0) queue.push(x.key);
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

/**
 * @param {*} array 
 * @param {*} defaultValue 
 * @example let a = {b : {c: 1}};   
 * @example getValue([a, 'b', 'c']) // 1
 * @example getValue([a, 'b', 'c', 'd']) // ""
 * @example getValue([a, 'b', 'c', 'd'], 2) // 2
 */
function getValue (array, defaultValue = '') {
  const reducer = (obj, property) => {
    let type = Object.prototype.toString.call(obj).slice(8, -1);

    if ( type === 'Object' || type === 'Array') {
      return obj.hasOwnProperty(property) ? obj[property] : defaultValue;
    }

    return defaultValue;
  }

  return array.reduce(reducer)
}
console.log(new _Node());
console.log(BST);
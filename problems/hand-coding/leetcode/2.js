function ListNode(val) {
  this.val = val;
  this.next = null;
}

var addTwoNumbers = function(nl1, nl2) {
  var flag = 0; // 进位标志
    var l3 = [];

    while (l1 || l2 || flag) {
    var isl1Null = l1 === null;  
    var isl2Null = l2 === null;
    var val1 = isl1Null ? 0 : l1.val;
    var val2 = isl2Null ? 0 : l2.val;
    var f = flag;

    l1 = isl1Null ? null : l1.next;
    l2 = isl2Null ? null : l2.next;  
    flag = val1 + val2 + flag > 9 ? 1 : 0;
    l3.push(new ListNode(val1 + val2 + f - flag * 10));
    }

    var len = l3.length;
    l3.forEach((node, index) => { 
      if (index < len-1) {
        node.next = l3[index+1];
      }
    });

    return l3[0];
};

var l1_1 = new ListNode(2);
var l1_2 = new ListNode(3);
var l1_3 = new ListNode(4);
var l1_4 = new ListNode(5);

var l2_1 = new ListNode(5);
var l2_2 = new ListNode(6);
var l2_3 = new ListNode(4);

l1_1.next = l1_2;
l1_2.next = l1_3;
l1_3.next = l1_4;

l2_1.next = l2_2;
l2_2.next = l2_3;

console.log(addTwoNumbers(l1_1, l2_1));
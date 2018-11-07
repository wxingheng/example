/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  if (!head || !head.next) {
    return head;
  }

  let newHead = null;

  while(head) {
    let tempNode = head;
    head = head.next;
    tempNode.next = newHead;
    newHead = tempNode;
  }

  return newHead;
};

var l1_1 = new ListNode(2);
var l1_2 = new ListNode(3);
var l1_3 = new ListNode(4);
var l1_4 = new ListNode(5);

l1_1.next = l1_2;
l1_2.next = l1_3;
l1_3.next = l1_4;
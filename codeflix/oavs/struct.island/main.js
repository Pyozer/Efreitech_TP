const mLinkedList = require('./m_linked_list');
const mStack = require('./m_stack');
const mTree = require('./m_tree');

console.log("\n=== ###  TREE  ### ===\n");

const tree = new mTree();
tree.insert(10);
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(15);
tree.insert(13);
tree.insert(18);

const tree2 = new mTree();
tree2.insert(10);
tree2.insert(5);
tree2.insert(3);
tree2.insert(7);
tree2.insert(15);
tree2.insert(13);
tree2.insert(18);

console.log(tree.compare(tree2))

console.log(tree.deep());
console.log(tree.search(7));

tree.remove(15);
tree.inorder();

//   TREE :
//            10
//        5        15
//      3  7    13   18

console.log("\n=== ###  STACK  ### ===\n");

const stack = new mStack();

console.log(stack.size());
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);

console.log(stack.size());
console.log(stack.top());

try {
    console.log(stack.pop()); // 5
    console.log(stack.pop()); // 4
    console.log(stack.pop()); // 3
    console.log(stack.pop()); // 2
    console.log(stack.pop()); // 1
    console.log(stack.pop());
} catch (e) {
    console.log(e);
}
console.log("isEmpty ? " + stack.isEmpty());


console.log("\n=== ###  LINKED LIST  ### ===\n");

const ll = new mLinkedList();

console.log("Length: " + ll.length());

console.log("\n=== Push ===\n");

console.log(ll.push(1));
console.log(ll.push(2, 3, 4));
ll.push(5);
console.log("Length: " + ll.length());
console.log("isEmpty ? " + ll.isEmpty())

console.log("\n=== toArray and toString ===\n")
console.log(ll.toArray());
console.log(ll.toString());

console.log("\n=== Reverse ===");
ll.reverseList(ll.getNodeByIndex(0));

console.log("\n=== toString ===\n")
console.log(ll.toString());

console.log("\n=== Reverse again ===");
ll.reverseList(ll.getNodeByIndex(0));

console.log("\n=== toString ===\n")
console.log(ll.toString());

console.log("\n=== NodeByIndex (0, 1, 4, 5) ===\n")
try {
    console.log(ll.getNodeByIndex(0)) // 1
    console.log(ll.getNodeByIndex(1)) // 2
    console.log(ll.getNodeByIndex(4)) // 5
    console.log(ll.getNodeByIndex(5)) // OutOfBounds
} catch (e) {
    console.log(e);
}

console.log("\n=== Search: 5 ===\n")
console.log(ll.getNodeByValue(5));

console.log("\n=== Pop ===\n")
console.log(ll.pop()); // 1

console.log("\n=== toArray ===\n")
console.log(ll.toArray()); // [2, 3, 4, 5]

console.log("\n=== Pop index 3 ===\n")
console.log(ll.popNodeByIndex(3)); // 5

console.log("\n=== toArray ===\n")
console.log(ll.toArray()); // [2, 3, 4]

console.log("\n=== Pop index 1, 1, 0 ===\n")
console.log(ll.popNodeByIndex(1)); // 3
console.log(ll.popNodeByIndex(1)); // 4
console.log(ll.popNodeByIndex(0)); // 2

console.log("\n=== toArray ===\n")
console.log(ll.toArray()); // []

console.log("isEmpty ? " + ll.isEmpty());

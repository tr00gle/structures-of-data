class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.previous = null;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor(head = null) {
    this.head = head;
  }

  // add one or more values, in reverse order
  add(...values) {
    values.forEach(value => {
      const node = new Node(null, value);
      node.next = this.head;
      this.head = node;
    });
  }

  insert(value, index) {
    if (index > this.size() - 1) throw new RangeError("Error: Index is great than list size.")
    const node = new Node(null, value);
    let currentIndex = 0;
    let currentNode = this.head;
    let previousNode = null;
    while (currentIndex < index) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      currentIndex += 1;
    }
    previousNode.next = node;
    node.next = currentNode;
  }

  // zero-based index, returns removed node's value
  remove(index) {
    let currentIndex = 0;
    let currentNode = this.head;
    let previousNode = null;
    while (currentIndex < index) {
      previousNode = currentNode;
      currentNode = currentNode.next
      currentIndex += 1;
    }
    previousNode.next = currentNode.next;
    return currentNode.value;
  }

  size() {
    if (this.head === null) return 0;
    let currentNode = this.head;
    let size = 1;
    while (currentNode.next) {
      size += 1;
      currentNode = currentNode.next;
    }
    return size;
  }

  reverse() {
    let currentNode = this.head;
    const newList = new SinglyLinkedList();
    while (currentNode) {
      newList.add(currentNode.value);
      currentNode = currentNode.next;
    }
    this.head = newList.head;
  }

  zip(list2) {
    let left = this.head;
    let right = list2.head;
    const newList = new SinglyLinkedList();
    while (left && right) {
      newList.add(left.value);
      newList.add(right.value);
      left = left.next;
      right = right.next;
    }

    while (left) {
      newList.add(left.value);
      left = left.next;
    }

    while (right) {
      newList.add(right.value);
      right = right.next;
    }

    this.head = newList.reverse().head;
  }

}


const testList = new SinglyLinkedList();
testList.add(5);
testList.add(10);
testList.add(15);
console.log('size', testList.size());
testList.insert("hi", 1);
console.log(testList);
testList.reverse();
console.log(testList);


class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // adds to the front of the list
  add(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
  }

  size()
}

// class LRUCache {
//   constructor(maxSize = 12) {
//     this.head = null;
//     this.tail = null;
//     this.currentSize = null;
//     this.maxSize = maxSize;
//     this.cache = {};
//   }
// }

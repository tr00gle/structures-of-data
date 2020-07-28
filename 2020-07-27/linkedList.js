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
    for (const value of values) {
      const node = new Node(null, value);
      node.next = this.head;
      this.head = node;
    }
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
  enqueue(key, value) {
    const node = new Node(key, value);
    if (this.head === null) {
      this.head = this.tail = node;
      return;
    }
    this.head.previous = node;
    node.next = this.head;
    this.head = node;
  }

  dequeue() {
    const dequeued = this.head;
    this.head = this.head.next;
    this.head.previous = null;
    return dequeued;
  }

  push(key, value) {
    const node = new Node(key, value);
    if (this.head === null) {
      this.head = this.tail = node;
      return
    }
    node.previous = this.tail;
    this.tail.next = node;
    this.tail = this.tail.next;
  }

  pop() {
    const popped = this.tail;
    this.tail = this.tail.previous;
    this.tail.next = null;
    return popped;
  }
}

const double = new DoublyLinkedList();
double.enqueue("first", 1);
double.enqueue("second", 2);
double.push("third", 3);
console.log(double);

class LRUCache extends DoublyLinkedList {
  constructor(maxSize = 3) {
    super();
    this.maxSize = maxSize;
    this.size = 0;
    this.cache = {};
  }

  write(key, value) {
    if (this.size === this.maxSize) {
      const popped = this.pop();
      delete this.cache[popped.key];
      this.size -= 1;
    }

    this.enqueue(key, value);
    this.cache[key] = this.head;
    this.size += 1;
  }

  read(key) {
    if (this.cache[key]) {
      const value = this.cache[key].value;
      this.remove(key);
      delete this.cache[key];
      this.write(key, value);
      return value;
    }

    throw new ReferenceError("This key is not currently cached.");
  }

  remove(key) {
    const node = this.cache[key];

    if (node.previous !== null) {
      node.previous.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next !== null) {
      node.next.previous = node.previous;
    } else {
      this.tail = node.previous;
    }

    this.size -= 1;
  }
}

const lru = new LRUCache();
lru.write("first", 100);
lru.write("second", 200);
console.log(lru.cache);
lru.write("third", 3);
lru.write("fourth", 10);
console.log(lru.read("fourth"));
console.log(Object.keys(lru.cache));
console.log(lru.cache);

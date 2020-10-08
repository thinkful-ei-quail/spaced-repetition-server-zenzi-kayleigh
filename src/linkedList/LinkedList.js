class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }
  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }
  insertBefore(newItem, targetItem) {
    let currNode = this.head;
    let previousNode = null;
    if (!currNode) {
      return (this.head = new _Node(newItem, null));
    }
    while (currNode.value !== targetItem) {
      if (currNode.next === null) {
        return null;
      } else {
        previousNode = currNode;
        currNode = currNode.next;
      }
    }
    if (previousNode === null) {
      return (this.head = new _Node(newItem, this.head));
    }
    return (previousNode.next = new _Node(newItem, currNode));
  }
  insertAt(nthPosition, itemToInsert) {
    if (nthPosition < 0) {
      throw new Error("Position error");
    }
    if (nthPosition === 0) {
      this.insertFirst(itemToInsert);
    } else {
      // Find the node which we want to insert after
      const node = this._findNthElement(nthPosition - 1);
      const newNode = new _Node(itemToInsert, null);
      newNode.next = node.next;
      node.next = newNode;
    }
  }
  _findNthElement(position) {
    let node = this.head;
    for (let i = 0; i < position; i++) {
      node = node.next;
    }
    return node;
  }
  insertAfter(item, newItem) {
    let currentNode = this.find(item);
    let newNode = new _Node(newItem, currentNode.next);
    currentNode.next = newNode;
  }
  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    while (currNode !== null && currNode.value !== item) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log("Item not found");
      return;
    }
    previousNode.next = currNode.next;
  }
  toArray() {
    let node = this.head;
    let nodes = [];
    while (node) {
      nodes.push(node.value);
      node = node.next;
    }
    return nodes;
  }
  updateLinks() {
    let node = this.head;
    while (node) {
      if (node.next) {
        node.value.next = node.next.value.id;
      }
      node = node.next;
    }
  }
}

module.exports = LinkedList;

const mNode = require('./m_node');

module.exports = class mLinkedList {
    constructor() {
        this._head = null;
        this._length = 0;
    }

    length() {
        return this._length;
    }

    isEmpty() {
        return this._length == 0;
    }

    last() {
        var node = this._head;
        while (node.next)
            node = node.next;
        return node;
    }

    push(...data) {
        const nodePushed = [];
        for (const elem of data) {
            const newNode = new mNode(elem);
            nodePushed.push(newNode);
            if (!this._head) {
                this._head = newNode;
            } else {
                const lastNode = this.last();
                lastNode.next = newNode;
            }
            this._length++;
        }

        if (data.length > 1) // If multiple data inpunt
            return nodePushed;
        else // If data input contain only one element, return it
            return nodePushed[0];
    }

    pop() {
        if (this._length == 0)
            throw "Empty list";

        const nodeToRemove = this._head;

        this._head = this._length == 1 ? null : this._head.next;
        this._length--;

        nodeToRemove.next = null;
        return nodeToRemove;
    }

    getNodeByIndex(index) {
        if (index > this._length - 1)
            throw "LinkedListIndexOutOfBounds";

        let node = this._head;
        for (let i = 0; i < index; i++)
            node = node.next;
        return node;
    }

    popNodeByIndex(index) {
        if (index > this.length - 1)
            throw "LinkedListIndexOutOfBounds";

        let node = this._head;
        for (let i = 0; i < index - 1; i++)
            node = node.next;

        const nodeToPop = (index == 0) ? node : node.next;

        // var 'node' is the node before the wanted node (index - 1)
        if (index == 0) // If pop first element
            this.head = node.next
        else
            node.next = node.next.next;

        this._length--;
        // Remove link of the popped node
        nodeToPop.next = null;
        return nodeToPop;
    }

    getNodeByValue(v) {
        var node = this._head;
        while (node && node.data != v)
            node = node.next;
        return node;
    }

    reverseList() {
        var currNode = this._head;
        var prevNode = null;

        while (currNode) {
            let nextNode = currNode.next;
            currNode.next = prevNode;
            prevNode = currNode;
            currNode = nextNode;
        }
        this._head = prevNode; // Change head with last node
    }

    forEach(f) {
        if (this._length == 0) return;

        var node = this._head;
        f(node);
        while (node.next) {
            f(node.next);
            node = node.next;
        }
    }

    toArray() {
        let array = [];
        this.forEach((elem) => {
            array.push(elem.data);
        });
        return array;
    }

    toString() {
        let string = "";
        this.forEach((elem) => {
            string += elem.data;
            if (elem.next) string += " -> ";
        });
        return string;
    }
}
const mBinaryNode = require('./m_binary_node');

module.exports = class mTree {
    constructor() {
        this._root = null;
    }

    getRoot() {
        return this._root;
    }

    search(data) {
        return this.searchRecursive(data, this._root);
    }
    searchRecursive(data, node) {
        if (!node) return null;
        if (node.data == data) return node;
        let nextNode = (data < node.data) ? node.left : node.right;
        return this.searchRecursive(data, nextNode);
    }

    insert(data) {
        const newNode = new mBinaryNode(data);

        if (!this._root) {
            this._root = newNode;
            return;
        }

        let currNode = this._root;
        while (currNode) {
            if (data < currNode.data) {
                if (!currNode.left) {
                    currNode.left = newNode;
                    return;
                } else {
                    currNode = currNode.left;
                }
            } else {
                if (!currNode.right) {
                    currNode.right = newNode;
                    return;
                } else {
                    currNode = currNode.right;
                }
            }
        }
    }

    remove(data) {
        let currentNode = this._root;

        if (currentNode == null)
            throw "Empty tree";

        if (currentNode.data == data)
            this._root = null;

        while (currentNode) {
            if (data < currentNode.data)
                if (currentNode.left && currentNode.left.data == data)
                    currentNode.left = null;
                else
                    currentNode = currentNode.left;
            else
                if (currentNode.right && currentNode.right.data == data)
                    currentNode.right = null;
                else
                    currentNode = currentNode.right;
        }
    }

    inorder() {
        this.inorderFrom(this._root);
    }
    inorderFrom(node) {
        if (node) {
            this.inorderFrom(node.left)
            console.log(node.data)
            this.inorderFrom(node.right)
        }
    }

    deep() {
        return this.deepNodes(this._root);
    }
    deepNodes(node) {
        if (!node) return 0;
        const leftH = this.deepNodes(node.left);
        const rightH = this.deepNodes(node.right);
        return Math.max(leftH, rightH) + 1;
    }

    compare(tree) {
        return this.compareNodes(tree.getRoot(), this._root);
    }
    compareNodes(nodeA, nodeB) {
        if (nodeA == null && nodeB == null)
            return true;

        if (nodeA != null && nodeB != null) {
            return (nodeA.data == nodeB.data &&
                this.compareNodes(nodeA.left, nodeB.left) &&
                this.compareNodes(nodeA.right, nodeB.right));
        }

        return false;
    }
}
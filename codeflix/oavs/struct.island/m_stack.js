const mLinkedList = require('./m_linked_list')

module.exports = class mStack {
    constructor() {
        this._list = new mLinkedList();
    }

    size() {
        return this._list.length();
    }

    isEmpty() {
        return this._list.isEmpty();
    }

    push(...data) {
        this._list.push(data);
    }

    pop() {
        if (this.isEmpty())
            throw "Empty stack";

        return this._list.popNodeByIndex(this.size() - 1);
    }

    top() {
        return this._list.last();
    }
}
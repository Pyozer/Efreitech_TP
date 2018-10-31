module.exports = class mNode {
    constructor(data, next) {
        this._data = data;
        this._next = next ? next : null;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }

    get next() {
        return this._next;
    }

    set next(next) {
        this._next = next;
    }
}
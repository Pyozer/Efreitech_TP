const { EventEmitter } = require('events');

const myEmitter = new EventEmitter();

function empty() {
    myEmitter.emit('hi');
}

function withArgs(...args) {
    args.forEach(arg => {
        myEmitter.emit('newFellow', arg)
    })
}

module.exports = {
    myEmitter,
    empty,
    withArgs
}
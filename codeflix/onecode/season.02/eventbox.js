const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

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
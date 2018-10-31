const eventbox = require('./eventbox')
const streambox = require('./streambox')
const myEventEmitter = require('./myEventEmitter')

const args = process.argv

/*
eventbox.myEmitter.on('hi', () => {
    console.log('Ch0ooooooper!')
})
eventbox.empty()

eventbox.myEmitter.on('newFellow', (arg) => {
    console.log(`Here come's a new pirate ->> ${arg}`)
})
eventbox.withArgs(
    'Luffy',
    'Zoro',
    'Usopp',
    'Robin',
    'Robin',
    'Nami',
    'Sanji',
    'Ch0pper'
)

streambox.duplicate(args[2], (filename) => {
    console.log(`File: ${filename} sucessfully duplicated!`)
})
streambox.transform(
    args[2],
    /[a-zA-Z\éèêàãôçù]+/g,
    function (match) {
        return match.toUpperCase()
    },
    false
)
    
streambox.csv2json(args[2]);
    
streambox.WTFIsThisPipe('./', 'js')

const m = new myEventEmitter();

let eventHi = m.on("hi", data => {
    console.log(`event::hi [args == ${data.length}]`);
    for (const [idx, d] of data.entries()) {
        console.log(`${idx}: ${d}`);
    }
})

m.emit("hi");
m.emit("hi", "Ch0pper");
m.emit("hi", "Luffy", "Zoro");

eventHi.unsubscribe()
m.emit("hi", "not called because of unsubscribe")
*/

streambox.catPipeWc(args[2], args[3], (count) => {
    console.log(count)
})
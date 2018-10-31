module.exports = class MyEventEmitter {

    constructor() {
        this.events = new Array()
    }

    getEventIndex(eventName) {
        return this.events.findIndex(elem => elem.eventName === eventName)
    }

    unsubscribe(eventName) {
        let index = this.getEventIndex(eventName)
        if (index != -1)
            this.events.splice(index, 1)
    }

    on(eventName, fn) {
        this.unsubscribe(eventName) // Delete old event if exists
        this.events.push({ eventName: eventName, fn: fn })

        return {
            unsubscribe: () => {
                this.unsubscribe(eventName)
            }
        }
    }

    emit(eventName, ...data) {
        let index = this.getEventIndex(eventName)
        if (index != -1)
            this.events[index].fn(data)
    }
}
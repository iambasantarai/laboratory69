// RESOURCE: https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/

class EventEmitter {
  listeners = {};

  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }
  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    let lis = this.listeners[eventName];
    if (!lis) return this;

    for (let i = 0; i < lis.length; i--) {
      if (lis[i] === fn) {
        lis.splice(i, 1);
        break;
      }
    }
    return this;
  }
  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = () => {
      fn();
      this.off(eventName, onceWrapper);
    };
    this.listeners[eventName].push(onceWrapper);
    return this;
  }

  emit(eventName, ...args) {
    let fns = this.listeners[eventName];
    if (!fns) return false;
    fns.forEach((fn) => {
      fn(...args);
    });
    return true;
  }

  listenerCount(eventName) {
    let fns = this.listeners[eventName] || [];
    return fns.length;
  }

  rawListeners(eventName) {
    return this.listeners[eventName];
  }
}

// const EventEmitter = require("node:events");

class Emitter extends EventEmitter {}

const myEE = new Emitter();

myEE.on("foo", () => {
  console.log("The first foo event occurred.");
});

myEE.on("foo", () => {
  console.log("The second foo event occurred.");
});

myEE.once("bar", (x) => {
  console.log("The bar event occurred with a parameter:", x);
});

myEE.on("bar", (x) => {
  console.log("The bar event occurred with a parameter:", x);
});

myEE.emit("foo");
myEE.emit("foo");

myEE.emit("bar");
myEE.emit("bar", () => {
  console.log("Callback of bar event.");
});

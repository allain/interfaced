# Intr

Is a runtime library for partial support of `interfaces` in JavaScript.

## Basic Usage

```js
// Define some classes with empty methods (interfaces)
class Greeter {
    say() {}
}

class Serializable {
    serialize() {}
}


// Implements all methods from Greeter and Serializable
class Test extends intr([Greeter, Serializable]) {
  say() {
      alert('YO!')
  }

  serialize() {
      return 'serialized
  }
}
```

If the class you are writing needs to extends a base class, it can be passed as the second argument to **intr** like so

```js
class Person {
    constructor({firstName, lastName}) {
        this.firstName = firstName
        this.lastName = lastName
    }
}
class Greeter() {
    greet() {}
}

class Waitress extends intr([Greeter], Person) {
    greet() {
        const {firstName, lastName} = this
        alert(`Welcome! My name is ${firstName} ${lastName}`)
    }
}
```

If any of the methods were missing in the implementation, an Exception gets thrown.

## Disabling in Production

If **intr** detects that it is running in production, no checks will be performed.

Specifially the this code `class B extends intr(A) {}` becomes, effectively, `class B {}`.

function interfaced (clazz) {
  class Interfaced extends clazz {
    constructor (...params) {
      super(...params)

      Object.getOwnPropertyNames(clazz.prototype).forEach(prop => {
        if (
          this[prop] === clazz.prototype[prop] &&
          typeof clazz.prototype[prop] === 'function'
        ) {
          throw new Error('missing method: ' + prop)
        }
      })
    }
  }

  return Interfaced
}

module.exports = interfaced

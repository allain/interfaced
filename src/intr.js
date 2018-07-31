const isUndefined = x => typeof x === 'undefined'
const asArray = x => (Array.isArray(x) ? x : [x])

const inProduction =
  isUndefined(process) || process.env.NODE_ENV === 'production'

const check = (clazz, target) => {
  const missing = Object.getOwnPropertyNames(clazz.prototype).find(
    prop =>
      (isUndefined(target[prop]) || target[prop] === clazz.prototype[prop]) &&
      typeof clazz.prototype[prop] === 'function'
  )

  if (missing) {
    throw new Error(missing + ' is not implemented')
  }
}

const intr = (interfaces, parent = Object) =>
  (inProduction
    ? parent // no-op in production
    : class extends parent {
      constructor (...params) {
        super(...params)
        asArray(interfaces).map(clazz => check(clazz, this))
      }
      })

module.exports = intr

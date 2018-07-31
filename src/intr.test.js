const OLD_ENV = process.env

describe('interfaced', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env = OLD_ENV
  })

  it('supports empty class', () => {
    const intr = require('./intr')
    class A {}
    class B extends intr(A) {}
    expect(new B()).not.toBeInstanceOf(A)
  })

  it('does not complain when method implemented', () => {
    const intr = require('./intr')
    class A {
      test () {}
    }
    class B extends intr(A) {
      test () {
        return 10
      }
    }

    const b = new B()
    expect(b).not.toBeInstanceOf(A)
    expect(b.test()).toEqual(10)
  })

  it('supports multiple interfaces', () => {
    const intr = require('./intr')
    class A {
      a () {}
    }
    class B {
      b () {}
    }

    class C extends intr([A, B]) {
      a () {
        return 'AA'
      }
      b () {
        return 'BB'
      }
    }

    const c = new C()
    expect(c).not.toBeInstanceOf(A)
    expect(c).not.toBeInstanceOf(B)
    expect(c.a()).toEqual('AA')
    expect(c.b()).toEqual('BB')
  })

  it('complains when methods not overriden', () => {
    const intr = require('./intr')
    class A {
      test () {}
    }
    class B extends intr(A) {}

    expect(() => new B()).toThrowError(/test is not implemented/)
  })

  it('supports inheritance too', () => {
    const intr = require('./intr')
    class Named {
      fullName () {}
    }

    class Parent {
      constructor ({ firstName, lastName }) {
        this.firstName = firstName
        this.lastName = lastName
      }

      fullName () {
        return this.firstName + ' ' + this.lastName
      }
    }

    class Father extends intr(Named, Parent) {}
    const f = new Father({ firstName: 'Allain', lastName: 'Lalonde' })
    expect(f).toBeInstanceOf(Father)
    expect(f).toBeInstanceOf(Parent)
    expect(f.fullName()).toEqual('Allain Lalonde')
  })

  it('is noop when in node production environment', () => {
    process.env = { ...OLD_ENV, NODE_ENV: 'production' }
    const intr = require('./intr')

    class A {
      test () {}
    }
    class B extends intr(A) {}
    expect(() => new B()).not.toThrow()
  })
})

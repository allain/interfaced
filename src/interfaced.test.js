const interfaced = require('./interfaced')

describe('interfaced', () => {
  it('supports empty class', () => {
    class A {}
    class B extends interfaced(A) {}
    expect(new B()).toBeInstanceOf(A)
  })

  it('does not complain when method implemented', () => {
    class A {
      test () {}
    }
    class B extends interfaced(A) {
      test () {
        return 10
      }
    }

    const b = new B()
    expect(b).toBeInstanceOf(A)
    expect(b.test()).toEqual(10)
  })

  it('supports multiple interfaces', () => {
    class A {
      a () {}
    }
    class B {
      b () {}
    }

    class C extends interfaced(A, B) {
      a () {
        return 'AA'
      }
      b () {
        return 'BB'
      }
    }

    const c = new C()
    expect(c).toBeInstanceOf(A)
    // expect(c).toBeInstanceOf(B)
    expect(c.a()).toEqual('AA')
    expect(c.b()).toEqual('BB')
  })

  it('complains when methods not overriden', () => {
    class A {
      test () {}
    }
    console.log(Object.getOwnPropertyNames(A.prototype))
    class B extends interfaced(A) {}

    expect(() => new B()).toThrowError(/missing method: test/)
  })
})

import MiddlewareStack from '../index'

describe('Middleware', () => {
  describe('with no middleware', () => {
    it('invokes application', async () => {
      const middleware = new MiddlewareStack<string, string>()
      const result: string[] = []

      expect.assertions(1)

      await middleware.go('request', async (_: string) => {
        result.push('app')
        return 'result'
      })

      expect(result).toEqual(['app'])
    })
  })

  describe('with multiple middleware', () => {
    it('invokes middleware in order while passing requests and responses', async () => {
      const middleware = new MiddlewareStack<string, string>()
      const result: string[] = []

      expect.assertions(1)

      middleware.use(async (req, next) => {
        result.push(`mw1 called with ${req}`)
        const res = await next('mw1-req')
        result.push(`mw1 got ${res}`)
        return 'mw1-res'
      })

      middleware.use(async (req, next) => {
        result.push(`mw2 called with ${req}`)
        const res = await next('mw2-req')
        result.push(`mw2 got ${res}`)
        return 'mw2-res'
      })

      const goResult = await middleware.go('app-req', async req => {
        result.push(`app called with ${req}`)
        return 'app-res'
      })

      result.push(`go resolved to ${goResult}`)

      expect(result).toEqual([
        'mw1 called with app-req',
        'mw2 called with mw1-req',
        'app called with mw2-req',
        'mw2 got app-res',
        'mw1 got mw2-res',
        'go resolved to mw1-res',
      ])
    })
  })

  describe('when middlware raises an error', () => {
    it('rejects the call to go with that error', async () => {
      const middleware = new MiddlewareStack<string, string>()
      const expectedError = new Error()

      expect.assertions(1)

      middleware.use((_, __) => {
        throw expectedError
      })

      try {
        await middleware.go('request', async (_: string) => {
          fail('should not reach app if middleware throws')
          return 'result'
        })
      } catch (error) {
        expect(error).toBe(expectedError)
      }
    })
  })

  describe('when app raises an error', () => {
    it('rejects the call to go with that error', async () => {
      const middleware = new MiddlewareStack<string, string>()
      const expectedError = new Error()

      expect.assertions(1)

      middleware.use((req, handler) => handler(req))

      try {
        await middleware.go('request', async (_: string) => {
          throw expectedError
        })
      } catch (error) {
        expect(error).toBe(expectedError)
      }
    })
  })

  describe('when middlware doesnt call handler', () => {
    it('doesnt call the app', async () => {
      const middleware = new MiddlewareStack<string, string>()

      expect.assertions(1)

      middleware.use(async (_, __) => 'mw-res')

      const res = await middleware.go('request', async (_: string) => {
        fail('should not reach app if middleware throws')
        return 'result'
      })

      expect(res).toEqual('mw-res')
    })
  })
})

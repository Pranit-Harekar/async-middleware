## Asynchronous Middleware Package

This package provides minimal implementation for promise based asynchronous middleware pattern with complete typings.

### Installation

Using npm:

```Shell
$ npm i async-middleware-ts
```

### API

* #### `use(middleware: Middleware<Request, Response>)`

* #### `go(request: Request, handler: Handler<Request, Response>): Promise<Response>`

### Usage Examples:

```TypeScript
const mw = new MiddlewareStack<your-request-type, your-response-type>()

mw.use((request, handler) => {
  handler(request)
})

const result = await mw.go(your-request, async () => {
  // your-async-app-function
  return 'result'
})
```

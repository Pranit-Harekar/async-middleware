[![CircleCI](https://circleci.com/gh/Pranit-Harekar/async-middleware.svg?style=svg)](https://circleci.com/gh/Pranit-Harekar/async-middleware)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/Microsoft/TypeScript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)

# Asynchronous Middleware Package

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

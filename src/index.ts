export type Middleware<Request, Response> = (
  request: Request,
  handler: Handler<Request, Response>,
) => Promise<Response>

export type Handler<Request, Response> = (request: Request) => Promise<Response>

export default class MiddlewareStack<Request, Response> {
  public use(middleware: Middleware<Request, Response>) {
    const stack = this.go
    this.go = (request: Request, handler: Handler<Request, Response>) =>
      stack(request, newRequest => middleware(newRequest, handler))
  }

  public go = (request: Request, handler: Handler<Request, Response>): Promise<Response> =>
    handler(request)
}

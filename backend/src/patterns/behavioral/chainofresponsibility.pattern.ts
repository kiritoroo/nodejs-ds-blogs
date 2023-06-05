// Handler
export interface RequestHandler {
  setNext(handler: RequestHandler): void;
  handleRequest(request: Request): void;
}

// Request
export class Request {  
  constructor(public type: string, public amount: number) {}
}

// Concrete Handlers
export class StockAvailabilityHandler implements RequestHandler {
  private nextHandler: RequestHandler | null = null;

  setNext(handler: RequestHandler): void {
    this.nextHandler = handler;
  }

  handleRequest(request: Request): void {
    if (request.type === 'Stock' && request.amount <= 100) {
      console.log(`Handled by StockAvailabilityHandler: Request of type ${request.type} with amount ${request.amount}`);
    } else if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    } else {
      console.log('Cannot handle the request');
    }
  }
}

export class PriceValidationHandler implements RequestHandler {
  private nextHandler: RequestHandler | null = null;

  setNext(handler: RequestHandler): void {
    this.nextHandler = handler;
  }

  handleRequest(request: Request): void {
    if (request.type === 'Price' && request.amount >= 100 && request.amount <= 1000) {
      console.log(`Handled by PriceValidationHandler: Request of type ${request.type} with amount ${request.amount}`);
    } else if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    } else {
      console.log('Cannot handle the request');
    }
  }
}

export class OrderProcessingHandler implements RequestHandler {
  private nextHandler: RequestHandler | null = null;

  setNext(handler: RequestHandler): void {
    this.nextHandler = handler;
  }

  handleRequest(request: Request): void {
    if (request.type === 'Order' && request.amount > 1000) {
      console.log(`Handled by OrderProcessingHandler: Request of type ${request.type} with amount ${request.amount}`);
    } else if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    } else {
      console.log('Cannot handle the request');
    }
  }
}

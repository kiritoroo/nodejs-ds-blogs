
interface IOrderState {
  cancelOrder(): void;
  shipOrder(): void;
  completeOrder(): void;
}

export class NewOrderState implements IOrderState {
  
  cancelOrder(): void {
    console.log("Cannot cancel a new order.");
  }

  shipOrder(): void {
    console.log("Shipping order...");
  }

  completeOrder(): void {
    console.log("Cannot complete an order that hasn't been shipped.");
  }
}

export class ShippedOrderState implements IOrderState {
  cancelOrder(): void {
    console.log("Cannot cancel a shipped order.");
  }

  shipOrder(): void {
    console.log("Order has already been shipped.");
  }

  completeOrder(): void {
    console.log("Completing order...");
  }
}

export class CompletedOrderState implements IOrderState {
  cancelOrder(): void {
    console.log("Cannot cancel a completed order.");
  }

  shipOrder(): void {
    console.log("Cannot ship an order that has already been completed.");
  }

  completeOrder(): void {
    console.log("Order has already been completed.");
  }
}

// Context class
 export class Order {
  private _state: IOrderState;

  constructor() {
    this._state = new NewOrderState();
  }

  setState(state: IOrderState): void {
    this._state = state;
  }

  cancelOrder(): void {
    this._state.cancelOrder();
  }

  shipOrder(): void {
    this._state.shipOrder();
  }

  completeOrder(): void {
    this._state.completeOrder();
  }
}

/* // Usage
const order = new Order();

order.cancelOrder(); // Cannot cancel a new order.

order.shipOrder(); // Shipping order...

order.setState(new ShippedOrderState());

order.shipOrder(); 

order.completeOrder(); 

order.setState(new CompletedOrderState());

order.completeOrder(); 

order.cancelOrder();
 */
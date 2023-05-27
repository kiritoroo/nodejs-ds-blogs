interface ITicketStrategy {
  getPrice(): number;
  getUserCount(): number;
  isAvailableChildAttraction(): boolean;
}

export class ChildTicketStrategy implements ITicketStrategy {
  getPrice = (): number => 1000; 
  getUserCount = (): number => 1;
  isAvailableChildAttraction = (): boolean => true;
}

export class AdultTicketStrategy implements ITicketStrategy {
  getPrice = (): number => 3000; 
  getUserCount = (): number => 1;
  isAvailableChildAttraction = (): boolean => false;
}

export class PairTicketStrategy implements ITicketStrategy {
  getPrice = (): number => 5000; 
  getUserCount = (): number => 2;
  isAvailableChildAttraction = (): boolean => false;
}

export class Ticket {
  private _strategy: ITicketStrategy;
  constructor(strategy: ITicketStrategy) {
    this._strategy = strategy;
  }

  getPrice = (): number => this._strategy.getPrice(); 
  getUserCount = (): number => this._strategy.getUserCount(); 
  isAvailableChildAttraction = (): boolean => this._strategy.isAvailableChildAttraction(); 
}
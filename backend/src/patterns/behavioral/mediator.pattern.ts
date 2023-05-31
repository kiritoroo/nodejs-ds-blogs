interface Mediator {
    sendMessage(message: string, sender: Colleague): void;
  }
  
 export class ConcreteMediator implements Mediator {
    private colleague1: Colleague1;
    private colleague2: Colleague2;
  
    setColleague1(colleague: Colleague1): void {
      this.colleague1 = colleague;
    }
  
    setColleague2(colleague: Colleague2): void {
      this.colleague2 = colleague;
    }
  
    sendMessage(message: string, sender: Colleague): void {
      if (sender === this.colleague1) {
        this.colleague2.receiveMessage(message);
      } else if (sender === this.colleague2) {
        this.colleague1.receiveMessage(message);
      }
    }
  }
  
 export abstract class Colleague {
    constructor(protected mediator: Mediator) {}
  
    abstract send(message: string): void;
    abstract receiveMessage(message: string): void;
  }
  
 export class Colleague1 extends Colleague {
    send(message: string): void {
      console.log("Colleague 1 sends message", message);
      this.mediator.sendMessage(message, this);
    }
  
    receiveMessage(message: string): void {
      console.log("Colleague 1 receives message", message);
    }
  }
  
 export class Colleague2 extends Colleague {
    send(message: string): void {
      console.log("Colleague 2 sends message", message);
      this.mediator.sendMessage(message, this);
    }
  
    receiveMessage(message: string): void {
      console.log("Colleague 2 receives message", message);
    }
  }
  

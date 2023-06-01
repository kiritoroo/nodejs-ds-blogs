export class Memento {
    private state: string;
  
    constructor(state: string) {
      this.state = state;
    }
  
    getState(): string {
      return this.state;
    }
  }
  

export class Caretaker {
    private mementos: Memento[];
  
    constructor() {
      this.mementos = [];
    }
  
    addMemento(memento: Memento): void {
      this.mementos.push(memento);
    }
  
    getMemento(index: number): Memento | undefined {
      return this.mementos[index];
    }
  }
  
  export class Originator {
    private state: string;
  
    setState(state: string): void {
      this.state = state;
    }
  
    getState(): string {
      return this.state;
    }
  
    saveStateToMemento(): Memento {
      return new Memento(this.state);
    }
  
    restoreStateFromMemento(memento: Memento): void {
      this.state = memento.getState();
    }
  }
  
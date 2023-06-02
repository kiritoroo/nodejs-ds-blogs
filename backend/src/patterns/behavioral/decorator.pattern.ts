interface Pizza {
    getDescription(): string;
    getCost(): number;
  }
  
export  class Margherita implements Pizza {
    getDescription(): string {
      return "Margherita Pizza";
    }
  
    getCost(): number {
      return 5.99;
    }
  }
  
export  abstract class PizzaDecorator implements Pizza {
    protected pizza: Pizza;
  
    constructor(pizza: Pizza) {
      this.pizza = pizza;
    }
  
    getDescription(): string {
      return this.pizza.getDescription();
    }
  
    getCost(): number {
      return this.pizza.getCost();
    }
  }
  
export  class TomatoTopping extends PizzaDecorator {
    getDescription(): string {
      return this.pizza.getDescription() + ", with Tomato";
    }
  
    getCost(): number {
      return this.pizza.getCost() + 3.5;
    }
  }
  
export  class CheeseTopping extends PizzaDecorator {
    getDescription(): string {
      return this.pizza.getDescription() + ", with Cheese";
    }
  
    getCost(): number {
      return this.pizza.getCost() + 5.0;
    }
  }
  

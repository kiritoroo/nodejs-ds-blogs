interface Product {
  name: string;
  price: number;
  getDescription(): string;
}

export class ProductA implements Product {
  name: string;
  price: number;

  constructor() {
    this.name = "Product A";
    this.price = 10;
  }

  getDescription(): string {
    return "This is Product A";
  }
}

export class ProductB implements Product {
  name: string;
  price: number;

  constructor() {
    this.name = "Product B";
    this.price = 20;
  }

  getDescription(): string {
    return "This is Product B";
  }
}

export class ProductFactory {
  createProduct(type: string): Product {
    if (type === "A") {
      return new ProductA();
    } else if (type === "B") {
      return new ProductB();
    } else {
      throw new Error("Invalid product type");
    }
  }
}

/* 
const factory = new ProductFactory();

const productA = factory.createProduct("A");
console.log(productA.name); 
console.log(productA.price); 
console.log(productA.getDescription());

const productB = factory.createProduct("B");
console.log(productB.name); 
console.log(productB.price); 
console.log(productB.getDescription()); 
*/

export class Product {
    private name: string;
    private price: number;
    private description: string;
  
    constructor(builder: ProductBuilder) {
      this.name = builder.name;
      this.price = builder.price;
      this.description = builder.description;
    }
  
    getInfo(): string {
      return `Product: ${this.name}\nPrice: ${this.price}\nDescription: ${this.description}`;
    }
  }
  
export  class ProductBuilder {
    name: string;
    price: number;
    description: string;
  
    setName(name: string): ProductBuilder {
      this.name = name;
      return this;
    }
  
    setPrice(price: number): ProductBuilder {
      this.price = price;
      return this;
    }
  
    setDescription(description: string): ProductBuilder {
      this.description = description;
      return this;
    }
  
    build(): Product {
      return new Product(this);
    }
  }
/*   
  const product = new ProductBuilder()
    .setName("Product A")
    .setPrice(10)
    .setDescription("This is Product A")
    .build();
  console.log(product.getInfo());
   */
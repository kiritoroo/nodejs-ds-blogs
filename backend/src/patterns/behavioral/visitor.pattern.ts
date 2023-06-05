// Visitor interface
export interface Visitor {
  visitProduct(product: Product): void;
  visitService(service: Service): void;
}

// Element interface
export interface Element {
  accept(visitor: Visitor): void;
}

// Concrete Element
export class Product implements Element {
  accept(visitor: Visitor): void {
    visitor.visitProduct(this);
  }

  getProductDetails(): void {
    console.log('Product: Get product details');
  }
}

// Concrete Element
export class Service implements Element {
  accept(visitor: Visitor): void {
    visitor.visitService(this);
  }

  getServiceDetails(): void {
    console.log('Service: Get service details');
  }
}

// Concrete Visitor
export class InformationVisitor implements Visitor {
  visitProduct(product: Product): void {
    console.log('InformationVisitor: Visiting Product');
    product.getProductDetails();
  }

  visitService(service: Service): void {
    console.log('InformationVisitor: Visiting Service');
    service.getServiceDetails();
  }
}

// Concrete Visitor
export class PriceVisitor implements Visitor {
  visitProduct(product: Product): void {
    console.log('PriceVisitor: Visiting Product');
    // Calculate and display product price
  }

  visitService(service: Service): void {
    console.log('PriceVisitor: Visiting Service');
    // Calculate and display service price
  }
}

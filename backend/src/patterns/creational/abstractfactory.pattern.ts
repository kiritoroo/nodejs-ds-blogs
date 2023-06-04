// Abstract Product
export interface Shape {
  draw(): void;
}

// Concrete Products
export class Rectangle implements Shape {
  draw(): void {
    console.log("Inside Rectangle::draw() method.");
  }
}

export class Square implements Shape {
  draw(): void {
    console.log("Inside Square::draw() method.");
  }
}

// Abstract Factory
export interface ShapeFactory {
  createShape(): Shape;
}

// Concrete Factories
export class RectangleFactory implements ShapeFactory {
  createShape(): Shape {
    return new Rectangle();
  }
}

export class SquareFactory implements ShapeFactory {
  createShape(): Shape {
    return new Square();
  }
}
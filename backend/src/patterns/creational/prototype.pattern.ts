// Prototype
export interface Shape {
  clone(): Shape;
  draw(): void;
}

// Concrete Prototypes
export class Rectangle implements Shape {
  clone(): Shape {
    return new Rectangle();
  }

  draw(): void {
    console.log("Inside Rectangle::draw() method.");
  }
}

export class Circle implements Shape {
  clone(): Shape {
    return new Circle();
  }

  draw(): void {
    console.log("Inside Circle::draw() method.");
  }
}

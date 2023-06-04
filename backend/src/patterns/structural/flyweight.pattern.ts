interface Shape {
    draw(x: number, y: number): void;
  }
  
export class Circle implements Shape {
    private color: string;
  
    constructor(color: string) {
      this.color = color;
    }
  
    draw(x: number, y: number): void {
      console.log(`Drawing a ${this.color} circle at (${x}, ${y})`);
    }
  }
  
export  class ShapeFactory {

    private circleMap: { [color: string]: Circle } = {};
    getCircle(color: string): Circle {
      if (!this.circleMap[color]) {
        this.circleMap[color] = new Circle(color);
      }    
      return this.circleMap[color];
    }
  }
  

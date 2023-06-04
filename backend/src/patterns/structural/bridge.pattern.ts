
interface Shape {
    draw(): void;
  }
  

export class Circle implements Shape {
    draw(): void {
      console.log("Drawing a circle");
    }
  }
  
export  class Rectangle implements Shape {
    draw(): void {
      console.log("Drawing a rectangle");
    }
  }
  
  interface Renderer {
    renderShape(): void;
  }
  
 
export class VectorRenderer implements Renderer {
    renderShape(): void {
      console.log("Rendering shape in vector format");
    }
  }
  
export  class RasterRenderer implements Renderer {
    renderShape(): void {
      console.log("Rendering shape in raster format");
    }
  }
export class ShapeWithRenderer implements Shape {
    constructor(private renderer: Renderer) {}
  
    draw(): void {
      this.renderer.renderShape();
    }
  }

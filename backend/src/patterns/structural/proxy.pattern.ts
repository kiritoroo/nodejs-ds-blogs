// Subject
export interface Image {
  display(): void;
}

// RealSubject
export class RealImage implements Image {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadImageFromDisk();
  }

  private loadImageFromDisk(): void {
    console.log(`Loading image from disk: ${this.filename}`);
  }

  display(): void {
    console.log(`Displaying image: ${this.filename}`);
  }
}

// Proxy
export  class ProxyImage implements Image {
  private filename: string;
  private realImage: RealImage | null;

  constructor(filename: string) {
    this.filename = filename;
    this.realImage = null;
  }

  display(): void {
    if (this.realImage === null) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// // Client
// const image: Image = new ProxyImage('image.jpg');
// // Image will be loaded and displayed
// image.display();
// // Image will be displayed from cache without reloading
// image.display();

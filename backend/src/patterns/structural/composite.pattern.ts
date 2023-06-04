// Component
export interface FileSystem {
  getName(): string;
  getSize(): number;
  print(): void;
}

// Leaf
export class File implements FileSystem {
  constructor(private name: string, private size: number) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  print(): void {
    console.log(`File: ${this.name}, Size: ${this.size}`);
  }
}

// Composite
export class Directory implements FileSystem {
  private children: FileSystem[] = [];

  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    let totalSize = 0;
    for (const child of this.children) {
      totalSize += child.getSize();
    }
    return totalSize;
  }

  add(fileSystem: FileSystem): void {
    this.children.push(fileSystem);
  }

  remove(fileSystem: FileSystem): void {
    const index = this.children.indexOf(fileSystem);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  print(): void {
    console.log(`Directory: ${this.name}, Size: ${this.getSize()}`);
    for (const child of this.children) {
      child.print();
    }
  }
}

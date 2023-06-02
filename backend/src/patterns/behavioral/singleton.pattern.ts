export class Singleton {
  
    private static instance: Singleton;
  
    private constructor() {
     
    }
  
    static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }
      return Singleton.instance;
    }
  
    someMethod(): void {  
      console.log("Singleton method called");
    }
  }
  
/*   
  const instance1 = Singleton.getInstance();
  instance1.someMethod(); 
  
  const instance2 = Singleton.getInstance();
  instance2.someMethod(); 
  
  console.log(instance1 === instance2); // true
   */
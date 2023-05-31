interface Command {
    execute(): void;
    undo(): void;
  }
  
export class Light {
    
    private isOn: boolean;
  
    constructor() {
      this.isOn = false;
    }
  
    turnOn(): void {
      this.isOn = true;
      console.log("Light turned on");
    }
  
    turnOff(): void {
      this.isOn = false;
      console.log("Light turned off");
    }
}
  
export  class LightOnCommand implements Command {
    private light: Light;
  
    constructor(light: Light) {
      this.light = light;
    }
  
    execute(): void {
      this.light.turnOn();
    }
  
    undo(): void {
      this.light.turnOff();
    }
  }
  
export  class LightOffCommand implements Command {
    private light: Light;
  
    constructor(light: Light) {
      this.light = light;
    }
  
    execute(): void {
      this.light.turnOff();
    }
  
    undo(): void {
      this.light.turnOn();
    }
  }
  
export class RemoteControl {
    private commands: Command[];
    private undoCommand: Command | null;
  
    constructor() {
      this.commands = [];
      this.undoCommand = null;
    }
  
    setCommand(command: Command): void {
      this.commands.push(command);
    }
  
    executeCommand(index: number): void {
      if (index >= 0 && index < this.commands.length) {
        const command = this.commands[index];
        command.execute();
        this.undoCommand = command;
      }
    }
  
    undo(): void {
      if (this.undoCommand) {
        this.undoCommand.undo();
      }
    }
  }
  
/*   // Usage
  const remoteControl = new RemoteControl();
  const light = new Light();
  
  const lightOnCommand = new LightOnCommand(light);
  const lightOffCommand = new LightOffCommand(light);
  
  remoteControl.setCommand(lightOnCommand);
  remoteControl.executeCommand(0); 
  
  remoteControl.setCommand(lightOffCommand);
  remoteControl.executeCommand(0); 
  
  remoteControl.undo(); 
   */
// Abstract Class
export abstract class TaskManager {
  public manageTask(): void {
    this.prepareTask();
    this.assignTask();
    this.performTask();
    this.followUpTask();
  }

  protected prepareTask(): void {
    console.log('TaskManager: Preparing task');
  }

  protected abstract assignTask(): void;

  protected abstract performTask(): void;

  protected followUpTask(): void {
    console.log('TaskManager: Following up on task');
  }
}

// Concrete Class
export class DevelopmentTaskManager extends TaskManager {
  protected assignTask(): void {
    console.log('DevelopmentTaskManager: Assigning development task');
  }

  protected performTask(): void {
    console.log('DevelopmentTaskManager: Performing development task');
  }
}

// Concrete Class
export class TestingTaskManager extends TaskManager {
  protected assignTask(): void {
    console.log('TestingTaskManager: Assigning testing task');
  }

  protected performTask(): void {
    console.log('TestingTaskManager: Performing testing task');
  }

  protected followUpTask(): void {
    console.log('TestingTaskManager: Following up on testing task');
  }
}

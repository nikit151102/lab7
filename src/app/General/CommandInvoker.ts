export class CommandInvoker {
  private commandHistory: any[] = [];
  private undoCommand: any[] = [];

  executeUp(command: any): void {
    this.commandHistory.push(command);
    command.execute();
  }

  undoBack(): void {
    if (this.commandHistory.length > 0) {
      const lastCommand = this.commandHistory.pop();
      lastCommand.undo();
      this.undoCommand.push(lastCommand); 
    }
  }

  undoUp(): void {
    if (this.undoCommand.length > 0) {
      const undoCommand = this.undoCommand.pop();
      undoCommand.execute();
      this.commandHistory.push(undoCommand);
    }
  }

  removeComponent(memoryLocation: string): void {
    this.commandHistory = this.commandHistory.filter(command => {
      return command.memory !== memoryLocation;
    });
  }
  
}

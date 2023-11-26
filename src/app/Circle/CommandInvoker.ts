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
      this.undoCommand.push(lastCommand)
      console.log("commandHistory")
      console.log("commandHistory", this.commandHistory)
      console.log("undoCommand")
      console.log("undoCommand", this.undoCommand)
      
    }
  }

  undoUp(): void {
    if (this.undoCommand.length > 0) {
      const undoCommand = this.undoCommand.pop();
      undoCommand.execute();
      this.commandHistory.push(undoCommand);
      console.log("undoCommand")
      console.log("undoCommand", this.undoCommand)
      console.log("commandHistory")
      console.log("commandHistory", this.commandHistory)
    }
  }

  removeComponent(memoryLocation: string): void {
    this.commandHistory = this.commandHistory.filter(command => {
      return command.memory !== memoryLocation;
    });
  }
}

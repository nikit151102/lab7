export class CommandInvoker {
    private commandHistory: any[] = [];
  
    executeCommand(command: any): void {
      this.commandHistory.push(command);
      command.execute();
    }
  
    undoLastCommand(): void {
      if (this.commandHistory.length > 0) {
        const lastCommand = this.commandHistory.pop();
        lastCommand.undo();
      }
    }
  }
  
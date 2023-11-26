import { Shape } from './ShapeCommands';

export class RemoveCommand {
  constructor(private shape: Shape) {}

  execute(): void {
    this.shape.remove();
  }

  undo(): void {
    // For simplicity, we won't implement undo for remove in this example.
    // You can extend this based on your requirements.
  }
}

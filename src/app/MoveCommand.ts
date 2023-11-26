import { Shape } from './ShapeCommands';

export class MoveCommand {
  private originalPosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor(private shape: Shape, private newX: number, private newY: number) {}

  execute(): void {
    this.originalPosition = { x: this.shape.x, y: this.shape.y };
    this.shape.move(this.newX, this.newY);
  }

  undo(): void {
    this.shape.move(this.originalPosition.x, this.originalPosition.y);
  }
}

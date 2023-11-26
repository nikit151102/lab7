import { Shape } from './ShapeCommands';

export class CreateCommand {
  private createdShape: Shape | null = null;

  constructor(private shapeType: new (...args: any[]) => Shape, private args: any[]) {}

  execute(): void {
    this.createdShape = new this.shapeType(...this.args);
    this.createdShape.draw();
  }

  undo(): void {
    if (this.createdShape) {
      this.createdShape.remove();
      this.createdShape = null;
    }
  }
}

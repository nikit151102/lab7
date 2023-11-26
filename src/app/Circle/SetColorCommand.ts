import { Shape } from '../ShapeCommands';

export class SetColorCommand {
  private originalColor: string = '';

  constructor(private shape: Shape, private newColor: string) {}

  execute(): void {
    this.originalColor = this.shape.color;
    this.shape.setColor(this.newColor);
  }

  undo(): void {
    this.shape.setColor(this.originalColor);
  }
}

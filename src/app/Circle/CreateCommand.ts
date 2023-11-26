import { Shape } from '../ShapeCommands';
import { StoringElementsService } from '../storingElements.service';

export class CreateCommand {
  private createdShape: Shape | null = null;
  private memory:string = ''
  constructor(
    private shapeType: new (...args: any[]) => Shape,
    private args: any[],
    private storingService: StoringElementsService
  ) {}

  execute(): void {
    const memoryLocation = `0x${(Math.random() * 0xFFFFFFFF).toString(16)}`
    this.memory = memoryLocation;
    this.createdShape = new this.shapeType();
    this.createdShape.setMemoryLocation(memoryLocation);
    this.createdShape.setCoordinates(this.args[0], this.args[1]);
    this.createdShape.setRadius(this.args[2]);
    this.createdShape.setColor(this.args[3]);
    this.createdShape.setElementRef(this.args[4]);
    this.storingService.Components.push(this.createdShape as any); // Assuming that Circle extends Shape
    this.createdShape.draw();
  }

  undo(): void {
    if (this.createdShape) {
      this.createdShape.remove();
      this.storingService.Components.pop(); // Remove the last added shape
      this.createdShape = null;
    }
  }
}

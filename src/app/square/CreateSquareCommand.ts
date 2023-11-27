import { modeSquare } from '../modeSquareCommands';
import { StoringElementsService } from '../storingElements.service';

export class CreateSquareCommand {
  private createdShape: modeSquare | null = null;
  private memory:string = ''
  constructor(
    private shapeType: new (...args: any[]) => modeSquare,
    private args: any[],
    private storingService: StoringElementsService
  ) {}

  execute(): void {
    const memoryLocation = `0x${(Math.random() * 0xFFFFFFFF).toString(16)}`;
    this.memory = memoryLocation;
    this.createdShape = new this.shapeType();
    this.createdShape.setMemoryLocation(memoryLocation);
    this.createdShape.setCoordinates(this.args[0], this.args[1]);
    this.createdShape.setsideLength(this.args[2]);
    this.createdShape.setColor(this.args[3]);
    this.createdShape.setZindex(this.args[4]);
    this.createdShape.setElementRef(this.args[5]);
    this.storingService.Components.push(this.createdShape as any);
    this.createdShape.draw();
  }

  undo(): void {
    if (this.createdShape) {
      this.storingService.Components.pop();
      this.createdShape = null;
    }
  }
}

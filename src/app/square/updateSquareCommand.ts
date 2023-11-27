import { modeSquare } from "../modeSquareCommands";
import { StoringElementsService } from "../storingElements.service";

export class UpdateSquareCommand {
  private originState: { x: number, y: number, sideLength: number, color: string, Zindex: number  } = {
    x: 0,
    y: 0,
    sideLength: 0,
    color: '',
    Zindex: 0
  };

  private modifiedState: { x: number, y: number, sideLength: number, color: string, Zindex: number } | null = null;

  constructor(
    private shape: modeSquare,
    private newX: number,
    private newY: number,
    private newsideLength: number,
    private newColor: string,
    private newZindex: number,
    private storingService: StoringElementsService
  ) { }

  execute(): void {
    this.modifiedState = {
      x: this.shape.x,
      y: this.shape.y,
      sideLength: this.shape.sideLength,
      color: this.shape.color,
      Zindex: this.shape.Zindex,
    };
    this.originState = {
      x: this.newX,
      y: this.newY,
      sideLength: this.newsideLength,
      color: this.newColor,
      Zindex: this.newZindex,
    };
    this.shape.setCoordinates(this.newX, this.newY);
    this.shape.setsideLength(this.newsideLength);
    this.shape.setColor(this.newColor);
    this.shape.setZindex(this.newZindex);
    const shapeIndex = this.storingService.Components.indexOf(this.shape as any);
    if (shapeIndex !== -1) {
      this.storingService.Components[shapeIndex] = this.shape as any;
    }
  }

  undo(): void {
    if (this.modifiedState) {
      this.shape.setCoordinates(this.modifiedState.x, this.modifiedState.y);
      this.shape.setsideLength(this.modifiedState.sideLength);
      this.shape.setColor(this.modifiedState.color);
      this.shape.setZindex(this.modifiedState.Zindex);
      const shapeIndex = this.storingService.Components.indexOf(this.shape as any);
      if (shapeIndex !== -1) {
        this.storingService.Components[shapeIndex] = this.shape as any;
      }
    }
  }


}
import { modeCircle } from "../modeCircleCommands";
import { StoringElementsService } from "../storingElements.service";

export class UpdateCommand {

  private originState: { x: number, y: number, radius: number, color: string, Zindex: number } = {
    x: 0,
    y: 0,
    radius: 0,
    color: '',
    Zindex: 0
  };

  private modifiedState: { x: number, y: number, radius: number, color: string, Zindex: number } | null = null;

  constructor(
    private shape: modeCircle,
    private newX: number,
    private newY: number,
    private newRadius: number,
    private newColor: string,
    private newZindex: number,
    private storingService: StoringElementsService
  ) { }

  execute(): void {
    this.modifiedState = {
      x: this.shape.x,
      y: this.shape.y,
      radius: this.shape.radius,
      color: this.shape.color,
      Zindex: this.shape.Zindex,

    };
    this.originState = {
      x: this.newX,
      y: this.newY,
      radius: this.newRadius,
      color: this.newColor,
      Zindex: this.newZindex,
    };
    this.shape.setCoordinates(this.newX, this.newY)
    this.shape.setRadius(this.newRadius);
    this.shape.setColor(this.newColor);
    this.shape.setZindex(this.newZindex);
    const shapeIndex = this.storingService.Components.indexOf(this.shape as any);
    if (shapeIndex !== -1) {
      this.storingService.Components[shapeIndex] = this.shape as any;
    }
  }

  undo(): void {
    if (this.modifiedState) {
      this.shape.setCoordinates(this.modifiedState.x, this.modifiedState.y)
      this.shape.setRadius(this.modifiedState.radius);
      this.shape.setColor(this.modifiedState.color);
      this.shape.setZindex(this.modifiedState.Zindex);
      const shapeIndex = this.storingService.Components.indexOf(this.shape as any);
      if (shapeIndex !== -1) {
        this.storingService.Components[shapeIndex] = this.shape as any;
      }
    }
  }

}
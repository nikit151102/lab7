import { Shape } from "../ShapeCommands";
import { StoringElementsService } from "../storingElements.service";
import { Circle } from "./Circle";

    export class UpdateCommand {
        private originalState: { x: number, y: number, radius: number, color: string } = {
          x: 0,
          y: 0,
          radius: 0,
          color: ''
        };
      
        private previousState: { x: number, y: number, radius: number, color: string } | null = null;
      
        constructor(
          private shape: Shape,
          private newX: number,
          private newY: number,
          private newRadius: number,
          private newColor: string,
          private storingService: StoringElementsService
        ) {}
      
        execute(): void {
          this.previousState = {
            x: this.shape.x,
            y: this.shape.y,
            radius: this.shape.radius,
            color: this.shape.color
          };
      
          this.originalState = {
            x: this.newX,
            y: this.newY,
            radius: this.newRadius,
            color: this.newColor
          };
      
          // Применить новое состояние к фигуре
          this.shape.move(this.newX, this.newY);
          this.shape.setRadius(this.newRadius);
          this.shape.setColor(this.newColor);
      
          // Обновить сервис хранения (если необходимо)
          const shapeIndex = this.storingService.Components.indexOf(this.shape as Circle);
          if (shapeIndex !== -1) {
            this.storingService.Components[shapeIndex] = this.shape as Circle;
          }
        }
      
        undo(): void {
          // Восстановить исходное состояние
          this.shape.move(this.originalState.x, this.originalState.y);
          this.shape.setRadius(this.originalState.radius);
          this.shape.setColor(this.originalState.color);
      
          // Обновить сервис хранения (если необходимо)
          const shapeIndex = this.storingService.Components.indexOf(this.shape as Circle);
          if (shapeIndex !== -1) {
            this.storingService.Components[shapeIndex] = this.shape as Circle;
          }
      
          // Сохранить текущее состояние как предыдущее
          this.previousState = {
            x: this.shape.x,
            y: this.shape.y,
            radius: this.shape.radius,
            color: this.shape.color
          };
        }
      
        getPreviousState(): { x: number, y: number, radius: number, color: string } | null {
          return this.previousState;
        }
      }
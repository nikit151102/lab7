import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommandInvoker } from './CommandInvoker';
import { Circle } from './Circle';
import { CreateCommand } from './CreateCommand';
import { MoveCommand } from './MoveCommand';
import { SetColorCommand } from './SetColorCommand';
import { RemoveCommand } from './RemoveCommand';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('circleContainer', { static: true }) circleContainer!: ElementRef;
  invoker: CommandInvoker = new CommandInvoker();
  shapes: Circle[] = [];
  circleForm!: FormGroup;
  selectedCircle: Circle | null = null;

  constructor(private fb: FormBuilder, private renderer: Renderer2, private el: ElementRef) { }
 
  ngOnInit(): void {
    this.circleForm = this.fb.group({
      x: [50, Validators.required],
      y: [50, Validators.required],
      radius: [20, Validators.required]
    });
  }


  addCircle(): void {
    if (this.circleForm.valid) {
      const { x, y, radius } = this.circleForm.value;
      const circle = new Circle();
      circle.setCoordinates(x, y);
      circle.setRadius(radius);
      circle.setElementRef(this.circleContainer.nativeElement);
      this.shapes.push(circle);
      this.invoker.executeCommand(new CreateCommand(Circle, [x, y, radius]));
      this.circleForm.reset();
    }
  }

  moveCircle(circle: Circle, newX: number, newY: number): void {
    this.invoker.executeCommand(new MoveCommand(circle, newX, newY));
  }

  setColor(circle: Circle, newColor: string): void {
    this.invoker.executeCommand(new SetColorCommand(circle, newColor));
  }

  removeCircle(circle: Circle): void {
    const index = this.shapes.indexOf(circle);
    if (index !== -1) {
      this.shapes.splice(index, 1);
      this.invoker.executeCommand(new RemoveCommand(circle));
    }
  }

  undoLastCommand(): void {
    this.invoker.undoLastCommand();
  }

  startDrag(event: MouseEvent, circle: Circle): void {
    this.circleForm.setValue({
      x: circle.x,
      y: circle.y,
      radius: circle.radius
    });
    this.selectedCircle = circle;
  }

  updateCircle(): void {
    if (this.selectedCircle) {
      const { x, y, radius } = this.circleForm.value;
      this.selectedCircle.move(x, y);
      this.selectedCircle.setRadius(radius);
      this.invoker.executeCommand(new MoveCommand(this.selectedCircle, x, y));
    }
  }

  getCircleStyles(circle: Circle): any {
    return {
      'width.px': circle.radius * 2,
      'height.px': circle.radius * 2,
      'border-radius': '50%',
      'margin.px': 10,
      'left.px': circle.x,
      'top.px': circle.y,
    };
  }
}

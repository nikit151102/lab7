import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommandInvoker } from './General/CommandInvoker';
import { Circle } from './Circle/Circle';
import { CreateCommand } from './Circle/CreateCommand';
import { RemoveCommand } from './General/RemoveCommand';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoringElementsService } from './storingElements.service'
import { UpdateCommand } from './Circle/updateCommand';
import { Square } from './square/Square';
import { CreateSquareCommand } from './square/CreateSquareCommand';
import { UpdateSquareCommand } from './square/updateSquareCommand';

import { CreateCircle, CreateShapeCommandBase} from  './q/CreateShapeCommandBase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('circleContainer', { static: true }) circleContainer!: ElementRef;
  invoker: CommandInvoker = new CommandInvoker();

  activeIndex: number | undefined;

  circleForm!: FormGroup;
  isEditCircle: boolean = false

  squareForm!: FormGroup;
  isEditSquare: boolean = false

  selectedComponent: any | null = null;

  constructor(private fb: FormBuilder, public StoringElementsService: StoringElementsService) { }

  ngOnInit(): void {
    this.circleForm = this.fb.group({
      x: [50, Validators.required],
      y: [50, Validators.required],
      radius: [20, Validators.required],
      color: new FormControl(),
      Zindex: [1, Validators.required]
    });

    this.squareForm = this.fb.group({
      x: [100, Validators.required],
      y: [100, Validators.required],
      sideLength: [20, Validators.required],
      color: new FormControl(),
      Zindex: [1, Validators.required]
    });
  }



  //----------------------------------------------------------------------general

  backCommand(): void {
    this.invoker.undoBack();
  }
  upCommand(): void {
    this.invoker.undoUp();
  }

  startDrag(event: MouseEvent, type: any): void {
    if (type.type == 'circle') {
      this.isEditCircle = true;
      this.circleForm.setValue({
        x: type.x, y: type.y, radius: type.radius, color: type.color, Zindex: type.Zindex
      });
      this.selectedComponent = type;
    } else {
      this.isEditSquare = true;
      this.squareForm.setValue({
        x: type.x, y: type.y, sideLength: type.sideLength, color: type.color, Zindex: type.Zindex
      });
      this.selectedComponent = type;
    }
  }

  removeComponent(): void {
    if (this.selectedComponent) {
      this.invoker.executeUp(new RemoveCommand(this.StoringElementsService, this.selectedComponent.memoryLocation));
      this.invoker.removeComponent(this.selectedComponent.memoryLocation);
    }
    this.isEditCircle = false;
    this.isEditSquare = false;
    this.circleForm.reset();
    this.squareForm.reset();
  }




  //----------------------------------------------------------------------cirle

  addCircle(): void {
    if (this.circleForm.valid) {
      const { x, y, radius, color,Zindex } = this.circleForm.value;
      this.invoker.executeUp(new CreateCircle(Circle, [x, y, radius, color,Zindex, this.circleContainer.nativeElement], this.StoringElementsService));
      this.circleForm.reset();
    }
  }

  updateCircle(): void {
    if (this.selectedComponent) {
      const { x, y, radius, color, Zindex } = this.circleForm.value;
      this.invoker.executeUp(new UpdateCommand(this.selectedComponent, x, y, radius, color, Zindex, this.StoringElementsService));
      this.isEditCircle = false;
      this.circleForm.reset();
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
      'background-color': circle.color,
      'z-index': circle.Zindex
    };
  }




  //----------------------------------------------------------------------square

  addSquare(): void {
    if (this.squareForm.valid) {
      const { x, y, sideLength, color,Zindex } = this.squareForm.value;
      this.invoker.executeUp(new CreateSquareCommand(Square, [x, y, sideLength, color,Zindex, this.circleContainer.nativeElement], this.StoringElementsService));
      this.squareForm.reset();
    }
  }

  updateSquare(): void {
    if (this.selectedComponent) {
      const { x, y, sideLength, color,Zindex } = this.squareForm.value;
      this.invoker.executeUp(new UpdateSquareCommand(this.selectedComponent, x, y, sideLength, color,Zindex, this.StoringElementsService));
      this.isEditSquare = false;
      this.squareForm.reset();
    }
  }

  getSquareStyles(squareForm: Square): any {
    return {
      'width.px': squareForm.sideLength,
      'height.px': squareForm.sideLength,
      'margin.px': 10,
      'left.px': squareForm.x,
      'top.px': squareForm.y,
      'background-color': squareForm.color,
      'z-index': squareForm.Zindex
    };
  }

}

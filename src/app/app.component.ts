import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommandInvoker } from './Circle/CommandInvoker';
import { Circle } from './Circle/Circle';
import { CreateCommand } from './Circle/CreateCommand';
import { MoveCommand } from './Circle/MoveCommand';
import { SetColorCommand } from './Circle/SetColorCommand';
import { RemoveCommand } from './Circle/RemoveCommand';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoringElementsService} from './storingElements.service'
import { UpdateCommand } from './Circle/updateCommand';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('circleContainer', { static: true }) circleContainer!: ElementRef;
  invoker: CommandInvoker = new CommandInvoker();

  circleForm!: FormGroup;
  selectedCircle: Circle | null = null;
  activeIndex: number | undefined;
  isEdit:boolean = false

  constructor(private fb: FormBuilder, private renderer: Renderer2, private el: ElementRef, public StoringElementsService:StoringElementsService) { }
 
  ngOnInit(): void {
    this.circleForm = this.fb.group({
      x: [50, Validators.required],
      y: [50, Validators.required],
      radius: [20, Validators.required],
      color: new FormControl(),
      Zindex: [1, Validators.required]
    });
  }

  addCircle(): void {
    if (this.circleForm.valid) {
      const { x, y, radius, color } = this.circleForm.value;
      console.log("color", color);
      this.invoker.executeUp(new CreateCommand(Circle, [x, y, radius, color, this.circleContainer.nativeElement], this.StoringElementsService));
      this.circleForm.reset();
    }
  }

  moveCircle(circle: Circle, newX: number, newY: number): void {
    this.invoker.executeUp(new MoveCommand(circle, newX, newY));
  }

  setColor(circle: Circle, newColor: string): void {
    this.invoker.executeUp(new SetColorCommand(circle, newColor));
  }

  backCommand(): void {
      this.invoker.undoBack();
  }
  upCommand(): void {
      this.invoker.undoUp();
  }

  startDrag(event: MouseEvent, circle: Circle): void {
    this.isEdit = true;
    this.circleForm.setValue({
      x: circle.x,
      y: circle.y,
      radius: circle.radius,
      color: circle.color,
      Zindex:circle.Zindex
    });
    this.selectedCircle = circle;
  }

  updateCircle(): void {
    if (this.selectedCircle) {
      const { x, y, radius, color } = this.circleForm.value;
      this.invoker.executeUp(new UpdateCommand(
        this.selectedCircle,
        x,
        y,
        radius,
        color,
        this.StoringElementsService
      ));
      this.isEdit = false;
      this.circleForm.reset();
    }
  }

  removeComponent(): void {
    if(this.selectedCircle){
      this.invoker.executeUp(new RemoveCommand(this.StoringElementsService,this.selectedCircle.memoryLocation))
      this.invoker.removeComponent(this.selectedCircle.memoryLocation)
    }
    this.isEdit = false;
    this.circleForm.reset();
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
      'Zindex':circle.Zindex
    };
  }
}

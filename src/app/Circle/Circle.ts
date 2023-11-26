import { ElementRef, Inject } from '@angular/core';
import { Shape } from '../ShapeCommands';
import { StoringElementsService } from '../storingElements.service';

export class Circle implements Shape {
    color: string = 'black';
    x = 0
    y = 0
    radius = 1
    Zindex = 1
    memoryLocation = ''
    elementRef!: ElementRef

    constructor (private storingElementsService: StoringElementsService){}

    setMemoryLocation(memoryLocation: string){
        this.memoryLocation = memoryLocation
    }

    setCoordinates(X: number, Y: number) {
        this.x = X;
        this.y = Y;
    }

    setRadius(Radius: number) {
        this.radius = Radius
    }

    setElementRef(elementRef: ElementRef): void {
        if (elementRef) {
            this.elementRef = elementRef;
            console.log("elementRef")
        }
    }

    setZindex(Zindex: number) {
        this.Zindex = Zindex;
    }

    draw(): void {
        if (this.storingElementsService) {
            this.storingElementsService.Components.push(this);
            console.log("storingElementsService", this.storingElementsService.Components);
        } else {
            console.error("storingElementsService is not initialized");
        }
    }
    
    move(x: number, y: number): void {
        console.log(`Move circle from (${this.x}, ${this.y}) to (${x}, ${y})`);
        this.x = x;
        this.y = y;
    }

    setColor(color: string): void {
        console.log(`Set circle color to ${color}`);
        this.color = color;
    }

    remove(): void {
        console.log(`Remove circle at (${this.x}, ${this.y})`);
    }
}

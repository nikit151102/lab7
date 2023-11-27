import { ElementRef, Inject } from '@angular/core';
import { modeSquare } from '../modeSquareCommands';
import { StoringElementsService } from '../storingElements.service';

export class Square implements modeSquare {
    type: string = "square";
    color: string = 'black';
    x = 0;
    y = 0;
    sideLength = 10;
    Zindex = 1;
    memoryLocation = '';
    elementRef!: ElementRef;

    constructor (private storingElementsService: StoringElementsService){}

    setMemoryLocation(memoryLocation: string){
        this.memoryLocation = memoryLocation;
    }

    setCoordinates(X: number, Y: number) {
        this.x = X;
        this.y = Y;
    }

    setsideLength(sideLength: number) {
        this.sideLength = sideLength;
    }

    setElementRef(elementRef: ElementRef): void {
        if (elementRef) {
            this.elementRef = elementRef;
        }
    }

    setZindex(Zindex: number) {
        this.Zindex = Zindex;
    }

    setColor(color: string): void {
        this.color = color;
    }
    
    draw(): void {
        if (this.storingElementsService) {
            this.storingElementsService.Components.push(this);
        } 
    }

}

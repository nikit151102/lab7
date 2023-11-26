import { ElementRef } from '@angular/core';
import { Shape } from './ShapeCommands';

export class Circle implements Shape {
    color: string = 'black';
    x = 0
    y = 0
    radius = 1
    elementRef!: ElementRef


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

    draw(): void {
        console.log(`Draw circle at (${this.x}, ${this.y}) with radius ${this.radius}`);
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

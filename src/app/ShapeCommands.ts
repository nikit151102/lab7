import { ElementRef } from "@angular/core";

export interface Shape {
    x: number;
    y: number;
    color: string;
    elementRef: ElementRef;
    draw(): void;
    move(x: number, y: number): void;
    setColor(color: string): void;
    remove(): void;
  }
  
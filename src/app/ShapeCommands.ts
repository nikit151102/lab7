import { ElementRef } from "@angular/core";

export interface Shape {
  x: number;
  y: number;
  color: string;
  radius: number;
  Zindex: number;
  elementRef: ElementRef;
  memoryLocation: string;
  draw(): void;
  move(x: number, y: number): void;
  setColor(color: string): void;
  remove(): void;
  setMemoryLocation(memoryLocation: string): void;
  setCoordinates(x: number, y: number): void;
  setRadius(R: number): void;
  setElementRef(ElementRef: ElementRef): void
}

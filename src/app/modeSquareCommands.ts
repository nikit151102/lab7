import { ElementRef } from "@angular/core";

export interface modeSquare {
  type: string;
  x: number;
  y: number;
  color: string;
  sideLength: number;
  Zindex: number;
  elementRef: ElementRef;
  memoryLocation: string;
  draw(): void;
  setColor(color: string): void;
  setMemoryLocation(memoryLocation: string): void;
  setCoordinates(x: number, y: number): void;
  setsideLength(sideLength: number): void;
  setElementRef(ElementRef: ElementRef): void;
  setZindex(value: number): void;
}

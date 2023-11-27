import { ElementRef } from "@angular/core";

export interface modeCircle {
  type: string;
  x: number;
  y: number;
  color: string;
  radius: number;
  Zindex: number;
  elementRef: ElementRef;
  memoryLocation: string;
  draw(): void;
  setColor(color: string): void;
  setMemoryLocation(memoryLocation: string): void;
  setCoordinates(x: number, y: number): void;
  setRadius(R: number): void;
  setElementRef(ElementRef: ElementRef): void;
  setZindex(value: number): void;
}

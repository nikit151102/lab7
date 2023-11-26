import { Injectable } from '@angular/core';
import { Circle } from './Circle/Circle';

@Injectable({
  providedIn: 'root'
})
export class StoringElementsService {

  constructor() { }

  Components: Circle[] = [];
  removedComponent: Circle[] = [];
  clearComponent: Circle[] = [];

  removeLastShape(): void {
    const lastShape = this.Components.pop();
    if (lastShape) {
      this.clearComponent.push(lastShape);
    }
    console.log("this.shapes", this.Components);
    console.log("this.removedShapes", this.clearComponent);
  }

  removeComponent(memoryLocation: string): void {
    const index = this.Components.findIndex(Component => Component.memoryLocation === memoryLocation);
    if (index !== -1) {
      this.Components.splice(index, 1)[0];
    }
  }

 
}

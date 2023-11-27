import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoringElementsService {

  constructor() { }

  Components: any[] = [];
  removedComponent: any[] = [];
  clearComponent: any[] = [];

  removeLastShape(): void {
    const lastShape = this.Components.pop();
    if (lastShape) {
      this.clearComponent.push(lastShape);
    }
  }

  removeComponent(memoryLocation: string): void {
    const index = this.Components.findIndex(Component => Component.memoryLocation === memoryLocation);
    if (index !== -1) {
      this.Components.splice(index, 1)[0];
    }
  }

}

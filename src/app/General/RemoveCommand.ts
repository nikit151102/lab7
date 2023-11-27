import { StoringElementsService } from '../storingElements.service';

export class RemoveCommand {
  private removedmemoryLocation: string | null = null;

  constructor(private storingService: StoringElementsService, private memoryLocation:string) {
    this.removedmemoryLocation = memoryLocation;
  }

  execute(): void {
    if (this.removedmemoryLocation) {
      this.removedmemoryLocation = this.memoryLocation;
      this.storingService.removeComponent(this.removedmemoryLocation);
    }
  }

  undo(): void {}
}

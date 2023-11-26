import { StoringElementsService } from '../storingElements.service';

export class RemoveCommand {
  private removedmemoryLocation: string | null = null;

  constructor(private storingService: StoringElementsService, private memoryLocation:string) {
    this.removedmemoryLocation = memoryLocation;
  }

  execute(): void {
    if (this.removedmemoryLocation) {
      // Сохранить memoryLocation для возможного последующего отмены
      this.removedmemoryLocation = this.memoryLocation;
  console.log("this.removedmemoryLocation",this.removedmemoryLocation)
      // Вызвать метод для удаления элемента по memoryLocation
      this.storingService.removeComponent(this.removedmemoryLocation);
    }
  }

  undo(): void {
    
  }
}

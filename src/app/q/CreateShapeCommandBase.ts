import { modeCircle } from '../modeCircleCommands';
import { modeSquare } from '../modeSquareCommands';
import { StoringElementsService } from '../storingElements.service';

// Базовый абстрактный класс для общих свойств и методов
export abstract class CreateShapeCommandBase<T> {
    protected createdShape: T | null = null;
    protected memory: string = '';

    constructor(
        private shapeType: new (...args: any[]) => T,
        protected args: any[],
        protected storingService: StoringElementsService
    ) { }

    // Абстрактный метод, который должен быть реализован в подклассах
    abstract setShapeProperties(): void;

    execute(): void {
        this.createdShape = new this.shapeType();
        this.setShapeProperties();
        this.storingService.Components.push(this.createdShape as any);

    }

    undo(): void {
        if (this.createdShape) {
            this.storingService.Components.pop();
            this.createdShape = null;
        }
    }
}

// Класс для создания круга
export class CreateCircle extends CreateShapeCommandBase<modeCircle> {
    setShapeProperties(): void {
        if (this.createdShape) {
            const memoryLocation = `0x${(Math.random() * 0xFFFFFFFF).toString(16)}`;
            this.createdShape.setMemoryLocation(memoryLocation);
            this.createdShape.setCoordinates(this.args[0], this.args[1]);
            this.createdShape.setRadius(this.args[2]);
            this.createdShape.setColor(this.args[3]);
            this.createdShape.setZindex(this.args[4]);
            this.createdShape.setElementRef(this.args[5]);
            this.createdShape.draw();
        }
    }
}

// Класс для создания квадрата
export class CreateSquareCommand extends CreateShapeCommandBase<modeSquare> {
    setShapeProperties(): void {
        if (this.createdShape) {
            const memoryLocation = `0x${(Math.random() * 0xFFFFFFFF).toString(16)}`;
            this.createdShape.setMemoryLocation(memoryLocation);
            this.createdShape.setCoordinates(this.args[0], this.args[1]);
            this.createdShape.setsideLength(this.args[2]);
            this.createdShape.setColor(this.args[3]);
            this.createdShape.setZindex(this.args[4]);
            this.createdShape.setElementRef(this.args[5]);
            this.createdShape.draw();
        }
    }
}

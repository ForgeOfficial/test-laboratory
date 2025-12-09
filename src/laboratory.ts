export class Laboratory {
    private readonly substances: Map<string, number> = new Map();
    constructor(...substances: string[]) {
        substances.forEach((substance) => this.substances.set(substance, 0));
    }

    getQuantity(substance: string): number {
        throw new Error('not implemented.');
    }
}
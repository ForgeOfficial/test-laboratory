export class Laboratory {
    private readonly substances: Map<string, number> = new Map();
    constructor(...substances: string[]) {
        substances.forEach((substance) => this.substances.set(substance, 0));
    }

    getQuantity(substance: string): number {
        return this.substances.get(substance);
    }
}
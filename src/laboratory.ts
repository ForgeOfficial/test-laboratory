export class Laboratory {
    private readonly substances: Map<string, number> = new Map();
    constructor(...substances: string[]) {
        if (substances.length === 0) throw new Error('Laboratory need substances.');
        substances.forEach((substance) => this.substances.set(substance, 0));
    }

    getQuantity(substance: string): number {
        if (!this.substances.has(substance)) throw new Error('Substance not found.');
        return this.substances.get(substance);
    }
}
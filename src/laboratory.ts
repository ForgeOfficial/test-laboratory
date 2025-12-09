export type Reaction = { quantity: number; substance: string };
export type ReactionsMap = Record<string, Reaction[]>;

export class Laboratory {
    private readonly substances: Map<string, number> = new Map();
    private readonly reactions: ReactionsMap;
    private readonly products: Map<string, number> = new Map();

    constructor(reactions: ReactionsMap, ...substances: string[]) {
        if (substances.length === 0) throw new Error('Laboratory need substances.');
        if (substances.length !== new Set(substances).size) throw new Error('Laboratory not accept duplicate substances.')
        substances.forEach((substance) => this.substances.set(substance, 0));

        Object.keys(reactions).forEach((reactionName) => {
            const reaction = reactions[reactionName];
            reaction.forEach(element => {
                if (
                    typeof element.quantity !== 'number' || element.quantity <= 0 ||
                    typeof element.substance !== 'string'
                ) throw new Error('Laboratory need valid reactions.');
                if (!this.substances.has(element.substance)) throw new Error('Laboratory need reactions with valid substance.');
            });
            this.products.set(reactionName, 0);
        })
    }

    getQuantity(element: string): number {
        if (this.products.has(element))
            return this.products.get(element);
        if (this.substances.has(element))
            return this.substances.get(element);
        throw new Error('Element not found.');
    }

    add(element: string, quantity: number): void {
        if (typeof element !== 'string') throw new Error('Element must be a string.');
        if (quantity <= 0 || typeof quantity !== 'number') throw new Error('Quantity must be a number and upper than 0');
        const newQuantity = this.getQuantity(element)+quantity;
        if (this.products.has(element))
            this.products.set(element, newQuantity);
        else this.substances.set(element, newQuantity);
    }
}
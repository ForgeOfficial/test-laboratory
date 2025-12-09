export type Reaction = { quantity: number; substance: string };
export type ReactionsMap = Record<string, Reaction[]>;

export class Laboratory {
    private readonly substances: Map<string, number> = new Map();
    private readonly reactions: ReactionsMap;

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
            })
        })
    }

    getQuantity(substance: string): number {
        if (!this.substances.has(substance)) throw new Error('Substance not found.');
        return this.substances.get(substance);
    }

    add(substance: string, quantity: number): void {
        if (typeof substance !== 'string') throw new Error('Substance must be a string.');
        if (quantity <= 0 || typeof quantity !== 'number') throw new Error('Quantity must be a number and upper than 0');
        this.substances.set(substance, this.getQuantity(substance)+quantity);
    }
}
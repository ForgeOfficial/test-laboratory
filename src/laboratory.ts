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

        if (!reactions || typeof reactions !== 'object' || Array.isArray(reactions)) throw new Error('The type of reactions is invalid.');

        Object.keys(reactions).forEach((reactionName) => {
            const reaction = reactions[reactionName];
            if (this.substances.has(reactionName)) throw new Error('Laboratory not accept reaction with same name has substances.');
            reaction.forEach(element => {
                if (
                    !Number.isFinite(element.quantity) || element.quantity <= 0 ||
                    typeof element.substance !== 'string'
                ) throw new Error('Laboratory need valid reactions.');
                if (
                    !this.substances.has(element.substance) && !Object.keys(reactions).includes(element.substance)
                ) throw new Error('Laboratory need reactions with valid substance.');
            });
            this.products.set(reactionName, 0);
        });
        this.reactions = reactions;
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
        if (quantity <= 0 || !Number.isFinite(quantity)) throw new Error('Quantity must be a number and upper than 0');
        const newQuantity = this.getQuantity(element) + quantity;
        if (this.products.has(element))
            this.products.set(element, newQuantity);
        else this.substances.set(element, newQuantity);
    }

    make(product: string, desiredQuantity: number): number {
        const reactions = this.reactions[product];
        if (!reactions) throw new Error('The product not exist.');
        if (!Number.isFinite(desiredQuantity) || desiredQuantity <= 0)
            throw new Error('The desired quantity is invalid.');

        let maxCraftable = desiredQuantity;
        const usage: { substance: string; perUnit: number; available: number; isProduct: boolean }[] = [];

        for (const reaction of reactions) {
            const { substance, quantity: perUnit } = reaction;

            const available = this.getQuantity(substance);
            if (available <= 0) {
                return 0;
            }

            const possibleWithThis = Math.floor(available / perUnit);
            if (possibleWithThis < maxCraftable) {
                maxCraftable = possibleWithThis;
                if (maxCraftable === 0) return 0;
            }

            usage.push({
                substance,
                perUnit,
                available,
                isProduct: this.products.has(substance),
            });
        }

        if (maxCraftable <= 0) return 0;

        for (const u of usage) {
            const remaining = u.available - u.perUnit * maxCraftable;
            if (u.isProduct) {
                this.products.set(u.substance, remaining);
            } else {
                this.substances.set(u.substance, remaining);
            }
        }

        const currentProductQty = this.getQuantity(product);
        this.products.set(product, currentProductQty + maxCraftable);

        return maxCraftable;
    }
}
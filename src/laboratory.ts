export class Laboratory {
    private readonly substances: string[];
    constructor(...substances: string[]) {
        this.substances = substances;
    }
}
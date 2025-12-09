import {Laboratory, ReactionsMap} from "./laboratory";

describe(Laboratory.name, () => {

    describe('init', () => {
        it('should create laboratory with substances', () => {
            // Act
            const laboratory = new Laboratory({}, "fake-substance-1", "fake-substance-2");

            // Assert
            expect(laboratory).toBeInstanceOf(Laboratory);
        });

        it('should throw if create laboratory without substances', () => {
            // Assert
            expect(() => new Laboratory({})).toThrow("Laboratory need substances.");
        });

        it('should throw if create laboratory with duplicate substances', () => {
            // Assert
            expect(() => new Laboratory({}, "fake", "fake")).toThrow("Laboratory not accept duplicate substances.");
        });

        it('should create laboratory with substances and reactions', () => {
            // Arrange
            const substances = ["fake-substance-1", "fake-substance-2"];
            const reactions: ReactionsMap = {
                fake: [
                    {quantity: 1, substance: substances[0] },
                    {quantity: 2, substance: substances[1] },
                ]
            };

            // Act
            const laboratory = new Laboratory(reactions, ...substances);

            // Assert
            expect(laboratory).toBeInstanceOf(Laboratory);
        });

        it.each([
            {quantity: 1, substance: false },
            {quantity: 1, substance: null },
            {quantity: 1, substance: 1 },

            {quantity: 0, substance: 'fake-substance-1' },
            {quantity: -1, substance: 'fake-substance-1' },
            {quantity: "1", substance: 'fake-substance-1' },
            {quantity: false, substance: 'fake-substance-1' },
        ])('should throw if create laboratory with invalid reactions', (reaction: any) => {
            // Arrange
            const reactions: ReactionsMap = {
                fake: [reaction]
            }

            // Assert
            expect(() => new Laboratory(reactions, 'fake-substance-1')).toThrow("Laboratory need valid reactions.");
        });

        it('should throw if reaction has substance not exist in laboratory', () => {
            // Arrange
            const substance = "fake-substance-1";
            const reactions: ReactionsMap = {
                fake: [{quantity: 1, substance: 'fake'}]
            }

            // Assert
            expect(() => new Laboratory(reactions, substance)).toThrow("Laboratory need reactions with valid substance.");
        });
    })

    describe('getQuantity', () => {
        let laboratory: Laboratory;
        beforeEach(() => {
            laboratory = new Laboratory({}, "fake-substance-1", "fake-substance-2");
        });

        it('should return quantity of substance', () => {
            // Act
            const result = laboratory.getQuantity('fake-substance-1');

            // Assert
            expect(result).toEqual(0);
        });

        it('should throw if element not exist', () => {
            // Assert
            expect(() => laboratory.getQuantity('error-element')).toThrow('Element not found.');
        });
    });

    describe('add', () => {
        let laboratory: Laboratory;
        beforeEach(() => {
            laboratory = new Laboratory({}, "fake-substance-1", "fake-substance-2");
        });

        it.each([1, 4, 2.3])('should add quantity to substance', (quantity) => {
            // Arrange
            const substance = 'fake-substance-1';

            // Act
            laboratory.add(substance, quantity);

            // Assert
            expect(laboratory.getQuantity(substance)).toEqual(quantity);
        });

        it.each(['1', null, undefined, 0, -1, false, {}])('should throw if quantity is invalid', (quantity) => {
            // Arrange
            const substance = 'fake-substance-1';

            // Assert
            expect(() => laboratory.add(substance, quantity as any)).toThrow('Quantity must be a number and upper than 0');
        });

        it.each([1, null, undefined, 0, -1, false, {}])('should throw if element is invalid', (substance) => {
            // Arrange
            const quantity = 1;

            // Assert
            expect(() => laboratory.add(substance as any, quantity)).toThrow('Element must be a string.');
        });

        it('should throw if element not exist', () => {
            // Arrange
            const substance = 'fake-1';
            const quantity = 1;

            // Assert
            expect(() => laboratory.add(substance, quantity)).toThrow('Element not found.');
        });

        it('should add quantity to product', () => {
            // Arrange
            const reactions = {
                "fake-product-1": [{quantity: 1, substance: 'fake-substance-1'}],
            }
            const product = 'fake-product-1';
            const quantity = 4;
            laboratory = new Laboratory(reactions, "fake-substance-1");

            // Act
            laboratory.add(product, quantity);

            // Assert
            expect(laboratory.getQuantity(product)).toEqual(quantity);
        });
    })
})
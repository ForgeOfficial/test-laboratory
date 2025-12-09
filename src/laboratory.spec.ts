import {Laboratory, ReactionsMap} from "./laboratory";

describe(Laboratory.name, () => {

    it('should create laboratory with substances', () => {
        // Act
        const laboratory = new Laboratory({}, "fake-substance-1", "fake-substance-2");

        // Assert
        expect(laboratory).toBeInstanceOf(Laboratory);
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

    it('should throw if create laboratory without substances', () => {
        // Assert
        expect(() => new Laboratory({})).toThrow("Laboratory need substances.");
    });

    it('should throw if create laboratory with duplicate substances', () => {
        // Assert
        expect(() => new Laboratory({}, "fake", "fake")).toThrow("Laboratory not accept duplicate substances.");
    });

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

        it('should throw if substance not exist', () => {
            // Assert
            expect(() => laboratory.getQuantity('error-substance')).toThrow('Substance not found.');
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

        it.each([1, null, undefined, 0, -1, false, {}])('should throw if substance is invalid', (substance) => {
            // Arrange
            const quantity = 1;

            // Assert
            expect(() => laboratory.add(substance as any, quantity)).toThrow('Substance must be a string.');
        });

        it('should throw if substance not exist', () => {
            // Arrange
            const substance = 'fake-1';
            const quantity = 1;

            // Assert
            expect(() => laboratory.add(substance, quantity)).toThrow('Substance not found.');
        });
    })
})
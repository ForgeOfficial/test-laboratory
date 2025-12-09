import {Laboratory} from "./laboratory";

describe(Laboratory.name, () => {

    it('should create laboratory with substances', () => {
        // Act
        const laboratory = new Laboratory("fake-substance-1", "fake-substance-2");

        // Assert
        expect(laboratory).toBeInstanceOf(Laboratory);
    });

    describe('getQuantity', () => {
        let laboratory: Laboratory;
        beforeEach(() => {
            laboratory = new Laboratory("fake-substance-1", "fake-substance-2");
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
    })
})
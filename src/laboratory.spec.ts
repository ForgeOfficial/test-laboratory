import {Laboratory} from "./laboratory";

describe(Laboratory.name, () => {

    it('should create laboratory with substances', () => {
        // Act
        const laboratory = new Laboratory("fake-substance-1", "fake-substance-2");

        // Assert
        expect(laboratory).toBeInstanceOf(Laboratory);
    });
})
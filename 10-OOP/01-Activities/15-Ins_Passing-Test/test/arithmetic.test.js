import Arithmetic from '../arithmetic.js';

describe('Arithmetic', () => {
    test('modulus should return the remainder of two numbers', () => {
        const arithmetic = new Arithmetic();
        expect(arithmetic.modulus(10, 3)).toBe(1);
    });
});
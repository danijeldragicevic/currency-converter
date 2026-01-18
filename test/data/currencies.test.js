import { currencies } from "../../src/data/currencies.js";

describe('Currencies Data', () => {
    test('currencies map has correct size', () => {
        expect(currencies.size).toBe(5);
    });

    test('currencies map contains expected currency codes', () => {
        const expectedCurrencies = ['USD', 'JPY', 'EUR', 'RUB', 'GBP'];
        expectedCurrencies.forEach(code => {
            expect(currencies.has(code)).toBe(true);
        });
    });

    test('currencies map has correct exchange rates', () => {
        expect(currencies.get('USD')).toBe(1);
        expect(currencies.get('JPY')).toBe(113.5);
        expect(currencies.get('EUR')).toBe(0.89);
        expect(currencies.get('RUB')).toBe(74.36);
        expect(currencies.get('GBP')).toBe(0.75);
    });
});
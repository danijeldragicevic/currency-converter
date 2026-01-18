import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import inquirer from "inquirer";
import { currencies } from "../../src/data/currencies.js";

// Mock inquirer
inquirer.prompt = jest.fn();

// Create mock functions for console UI
const mockShowWelcomeMessage = jest.fn();
const mockShowSuccessMessage = jest.fn();
const mockShowErrorMessage = jest.fn();

jest.unstable_mockModule('../../src/ui/console.js', () => ({
    showWelcomeMessage: mockShowWelcomeMessage,
    showSuccessMessage: mockShowSuccessMessage,
    showErrorMessage: mockShowErrorMessage
}));

const { main, isKnownCurrency, handleConvertFrom, handleConvertTo, handleAmount, calculateConversion } = await import("../../src/cli/main.js");

// Tests
describe("CLI Main Functionality", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("main function", () => {
        test("should convert on 'convert' action", async () => {
            inquirer.prompt
                .mockResolvedValueOnce({ action: "convert" })
                .mockResolvedValueOnce({ fromCurrency: "USD" })
                .mockResolvedValueOnce({ toCurrency: "EUR" })
                .mockResolvedValueOnce({ amount: 100 })
                .mockResolvedValueOnce({ action: "exit" }); // Need this mock to exit the loop

            await main();

            const usdRate = currencies.get("USD");
            const eurRate = currencies.get("EUR");
            const expectedResult = ((100 / usdRate) * eurRate).toFixed(4);

            expect(mockShowSuccessMessage).toHaveBeenCalledWith(
                `100 USD equals ${expectedResult} EUR\n`
            );
        });

        test("should exit on 'exit' action", async () => {
            inquirer.prompt.mockResolvedValueOnce({ action: "exit" });
            await main();

            expect(mockShowSuccessMessage).toHaveBeenCalledWith("Goodbye!\n");
        });
    });


    describe("handleConvertFrom", () => {
        test("should return the entered currency if known", async () => {
            mockShowSuccessMessage.mockClear();
            inquirer.prompt.mockResolvedValue({ fromCurrency: "USD" });
            const currency = await handleConvertFrom();

            expect(currency).toBe("USD");
            expect(mockShowSuccessMessage).toHaveBeenCalledWith('What do you want to convert?');
        });

        test("should re-prompt for unknown currency", async () => {
            mockShowSuccessMessage.mockClear();
            // First call returns unknown currency, second call returns valid currency
            inquirer.prompt
                .mockResolvedValueOnce({ fromCurrency: "ABC" })
                .mockResolvedValueOnce({ fromCurrency: "EUR" });

            const currency = await handleConvertFrom();

            expect(currency).toBe("EUR");
            expect(mockShowSuccessMessage).toHaveBeenCalledWith('What do you want to convert?');
            expect(mockShowErrorMessage).toHaveBeenCalledWith('Unknown currency');
            expect(inquirer.prompt).toHaveBeenCalledTimes(2);
        });
    })

    describe("handleConvertTo", () => {
        test("should return the entered currency if known", async () => {
            inquirer.prompt.mockResolvedValue({ toCurrency: "EUR" });
            const currency = await handleConvertTo();

            expect(currency).toBe("EUR");
        });

        test("should re-prompt for unknown currency", async () => {
            // First call returns unknown currency, second call returns valid currency
            inquirer.prompt
                .mockResolvedValueOnce({ toCurrency: "ABC" })
                .mockResolvedValueOnce({ toCurrency: "USD" });

            const currency = await handleConvertTo();

            expect(currency).toBe("USD");
            expect(mockShowErrorMessage).toHaveBeenCalledWith('Unknown currency');
            expect(inquirer.prompt).toHaveBeenCalledTimes(2);
        });
    })

    describe("isKnownCurrency", () => {
        test("should return true for known currency", () => {
            expect(isKnownCurrency("USD")).toBe(true);
        });

        test("should return false for unknown currency", () => {
            expect(isKnownCurrency("XYZ")).toBe(false);
        });
    });

    describe("handleAmount", () => {
        test("should return the entered amount", async () => {
            inquirer.prompt.mockResolvedValue({ amount: 150 });
            const amount = await handleAmount();

            expect(amount).toBe(150);
        });
    });

    describe("calculateConversion", () => {
        test("should correctly convert currency", () => {
            const result = calculateConversion("USD", "EUR", 100);
            const expected = ((100 / currencies.get("USD")) * currencies.get("EUR")).toFixed(4);

            expect(result).toBe(expected);
        });
    })
});
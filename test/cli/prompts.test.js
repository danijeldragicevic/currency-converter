import { actionPrompt, convertFromPrompt, convertToPrompt, amountPrompt } from "../../src/cli/prompts.js";
import { currencies } from "../../src/data/currencies.js";

describe("CLI Prompts", () => {
    describe("actionPrompt", () => {
        test("should have correct type", () => {
            expect(actionPrompt.type).toBe("list");
        });

        test("should have correct name", () => {
            expect(actionPrompt.name).toBe("action");
        });

        test("should have a message", () => {
            expect(actionPrompt.message).toBe("Please chose an option (convert, exit):");
        });

        test("should have all action choices", () => {
            expect(actionPrompt.choices).toEqual(["convert", "exit"]);
        });

        test("should have exactly 2 choices", () => {
            expect(actionPrompt.choices).toHaveLength(2);
        });

        test("should have loop set to false", () => {
            expect(actionPrompt.loop).toBe(false);
        });
    });

    describe("convertFromPrompt", () => {
        test("should have correct type", () => {
            expect(convertFromPrompt.type).toBe("list");
        });

        test("should have correct name", () => {
            expect(convertFromPrompt.name).toBe("fromCurrency");
        });

        test("should have a message", () => {
            expect(convertFromPrompt.message).toBe("From: ");
        });

        test("should have all currency choices", () => {
            expect(convertFromPrompt.choices).toEqual(Array.from(currencies.keys()));
        });

        test("should have loop set to false", () => {
            expect(convertFromPrompt.loop).toBe(false);
        });
    });

    describe("convertToPrompt", () => {
        test("should have correct type", () => {
            expect(convertToPrompt.type).toBe("list");
        });

        test("should have correct name", () => {
            expect(convertToPrompt.name).toBe("toCurrency");
        });

        test("should have a message", () => {
            expect(convertToPrompt.message).toBe("To: ");
        });

        test("should have all currency choices", () => {
            expect(convertToPrompt.choices).toEqual(Array.from(currencies.keys()));
        });

        test("should have loop set to false", () => {
            expect(convertToPrompt.loop).toBe(false);
        });
    });

    describe("amountPrompt", () => {
        test("should have correct type", () => {
            expect(amountPrompt.type).toBe("number");
        });

        test("should have correct name", () => {
            expect(amountPrompt.name).toBe("amount");
        });

        test("should have a message", () => {
            expect(amountPrompt.message).toBe("Amount: ");
        });

        test("should validate positive numbers", () => {
            expect(amountPrompt.validate(10)).toBe(true);
            expect(amountPrompt.validate(-5)).toBe("Amount must be a positive number.");
            expect(amountPrompt.validate(0)).toBe("Amount must be a positive number.");
        });
    });
});

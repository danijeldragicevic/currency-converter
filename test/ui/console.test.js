import chalk from "chalk";
import { showWelcomeMessage, showSuccessMessage, showErrorMessage } from "../../src/ui/console.js";
import { currencies } from "../../src/data/currencies.js";

// Mock console.log to capture output
let consoleOutput = [];
const mockLog = (output) => consoleOutput.push(output);

beforeEach(() => {
    consoleOutput = [];
    console.log = mockLog;
});

describe("Console UI functions", () => {
    test("showWelcomeMessage displays welcome and rates", () => {
        showWelcomeMessage();
        const rates = Array.from(currencies.entries())
            .map(([code, rate]) => `• 1 USD equals ${rate} ${code}`)
            .join('\n');
        const expectedMessage = chalk.green(`Welcome to Currency Converter!\n${rates}`);

        expect(consoleOutput[0]).toBe(expectedMessage);
    });

    test("showSuccessMessage displays in blue", () => {
        showSuccessMessage("Test success message");

        expect(consoleOutput[0]).toBe(chalk.blue("Test success message"));
    });

    test("showErrorMessage displays in red", () => {
        showErrorMessage("Test error message");

        expect(consoleOutput[0]).toBe(chalk.red("Test error message"));
    });
});
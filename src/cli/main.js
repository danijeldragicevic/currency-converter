import inquirer from "inquirer";
import {showErrorMessage, showSuccessMessage, showWelcomeMessage} from "../ui/console.js";
import {actionPrompt, amountPrompt, convertFromPrompt, convertToPrompt} from "./prompts.js";
import {currencies} from "../data/currencies.js";

// Start main if executed directly
if (process.argv[1] && process.argv[1].endsWith('main.js')) {
    main().catch(error => {
        showErrorMessage(error);
        process.exit(1);
    });
}

// Main function
export async function main() {
    let running = true;

    while (running) {
        showWelcomeMessage();
        const {action} = await inquirer.prompt(actionPrompt);
        switch (action) {
            case "convert":
                let fromCurrency = await handleConvertFrom();
                let toCurrency = await handleConvertTo();
                let amount = await handleAmount();
                let result = calculateConversion(fromCurrency, toCurrency, amount);
                showSuccessMessage(`${amount} ${fromCurrency} equals ${result} ${toCurrency}\n`);
                break;
            case "exit":
                showSuccessMessage("Goodbye!\n");
                running = false;
                break;
            default:
                showErrorMessage("Unknown action\n");
        }
    }
}

// Helpers
export function isKnownCurrency(currency) {
    return currencies.has(currency);
}

export async function handleConvertFrom() {
    showSuccessMessage('What do you want to convert?');
    let { fromCurrency } = await inquirer.prompt(convertFromPrompt);
    let sanitizedFromCurrency = fromCurrency.trim().toUpperCase();

    if (!isKnownCurrency(sanitizedFromCurrency)) {
        showErrorMessage('Unknown currency');
        return handleConvertFrom();
    } else {
        return sanitizedFromCurrency;
    }
}

export async function handleConvertTo() {
    let { toCurrency } = await inquirer.prompt(convertToPrompt);
    let sanitizedToCurrency = toCurrency.trim().toUpperCase();

    if (!isKnownCurrency(sanitizedToCurrency)) {
        showErrorMessage('Unknown currency');
        return handleConvertTo();
    } else {
        return sanitizedToCurrency;
    }
}

export async function handleAmount() {
    let { amount } = await inquirer.prompt(amountPrompt);
    return amount;
}

export function calculateConversion(fromCurrency, toCurrency, amount) {
    let fromRate = currencies.get(fromCurrency);
    let toRate = currencies.get(toCurrency);
    return ((amount / fromRate) * toRate).toFixed(4);
}
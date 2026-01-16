import chalk from "chalk";
import { currencies } from "../data/currencies.js";

export function showWelcomeMessage() {
    const rates = Array.from(currencies.entries())
        .map(([code, rate]) => `• 1 USD equals ${rate} ${code}`)
        .join('\n');

    console.log(chalk.green(`Welcome to Currency Converter!\n${rates}`));
}

export function showSuccessMessage(message) {
    console.log(chalk.blue(message));
}

export function showErrorMessage(message) {
    console.log(chalk.red(message));
}

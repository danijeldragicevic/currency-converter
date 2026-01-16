import { currencies } from "../data/currencies.js";

export const actionPrompt = {
    type: "list",
    name: "action",
    message: "Please chose an option (convert, exit):",
    choices: ["convert", "exit"],
    loop: false
}

export const convertFromPrompt = {
    type: "list",
    name: "fromCurrency",
    message: "From: ",
    choices: Array.from(currencies.keys()),
    loop: false
};

export const convertToPrompt = {
    type: "list",
    name: "toCurrency",
    message: "To: ",
    choices: Array.from(currencies.keys()),
    loop: false
};

export const amountPrompt = {
    type: "number",
    name: "amount",
    message: "Amount: ",
    validate: function(value) {
        if (value <= 0) {
            return "Amount must be a positive number.";
        }
        return true;
    }
};

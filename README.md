# 💱 Currency Converter CLI

[![Run Tests](https://github.com/danijeldragicevic/coffee-machine/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/danijeldragicevic/coffee-machine/actions/workflows/test.yml)

A command-line interface application for converting between different currencies, built with Node.js.

## Features
- **Convert Currency**: Convert amounts between USD, EUR, GBP, JPY, and RUB
- **Real-time Rates**: View current exchange rates on startup
- **Interactive CLI**: User-friendly command-line interface with prompts
- **Input Validation**: Ensures valid currency codes and positive amounts

## Getting Started

### Prerequisites
- Node.js (v20 or higher recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository or navigate to the project directory:
   ```bash
   cd currency-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
Start the currency converter:
```bash
npm start
```
The application displays current exchange rates (based on USD) and prompts you to convert currencies.

### Running Tests
Run all tests:
```bash
npm test
```

### Supported Currencies

| Currency Code | Name | Rate (to 1 USD) |
|---------------|------|-----------------|
| USD | US Dollar | 1.00 |
| EUR | Euro | 0.89 |
| GBP | British Pound | 0.75 |
| JPY | Japanese Yen | 113.50 |
| RUB | Russian Ruble | 74.36 |

## Usage
You will be prompted to choose an action: `convert` or `exit`.

#### 1. Convert Currency
Select the source currency, target currency, and amount to convert.
```bash
Welcome to Currency Converter!
• 1 USD equals 1 USD
• 1 USD equals 113.5 JPY
• 1 USD equals 0.89 EUR
• 1 USD equals 74.36 RUB
• 1 USD equals 0.75 GBP
? Please chose an option (convert, exit): convert
What do you want to convert?
? From: USD
? To: EUR
? Amount: 100
100 USD equals 89.0000 EUR
```

#### 2. Exit
Exit the application.
```bash
? Please chose an option (convert, exit): exit
Goodbye!
```

#### 3. Input Validation
The application validates currency codes and ensures the amount is a positive number.
```bash
? From: ABC
Unknown currency
What do you want to convert?
? From: USD
? To: EUR
? Amount: -50
Amount must be a positive number.
? Amount: 100
100 USD equals 89.0000 EUR
```

## Technologies
- **Node.js**: JavaScript runtime environment (ES modules)
- **Inquirer.js** (^13.1.0): Interactive command-line prompts
- **Chalk** (^5.6.2): Terminal string styling
- **Jest** (^30.2.0): Testing framework

## Ideas for Enhancement
- Fetch live exchange rates from an API (e.g., Open Exchange Rates, Fixer.io)
- Add more currencies (CAD, AUD, CHF, CNY, etc.)
- Implement currency conversion history
- Support offline mode with cached rates
- Add rate comparison over time
- Implement reverse calculation (from target to source)
- Create a web interface
- Add data visualization for rate trends

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.

## License
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

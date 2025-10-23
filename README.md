# Batch Maker - Chrome Extension

Chrome extension for splitting large PIX payments into compliant batches for Brazilian banks.

## Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `batch-maker` folder
5. The extension will appear in your browser toolbar

## Usage

1. Click the Batch Maker icon in Chrome toolbar
2. Select recipient from dropdown (Brasil Bitcoin, Caldeira, or Securitas)
3. Enter total amount to send (minimum R$ 15,000)
4. PIX key auto-fills (click "Editar" to modify if needed)
5. Click "Gerar CSV" to download the batch file

## How it Works

- Splits payments starting at R$ 14,999
- Each subsequent transaction decreases by R$ 1 (14,998, 14,997, etc.)
- Continues until total amount is reached
- Generates CSV with: Razão Social, CNPJ, PIX key, Amount
- No headers in CSV (as required by banks)

## Files

- `manifest.json` - Extension configuration
- `popup.html` - User interface
- `popup.js` - Payment logic and CSV generation
- `popup.css` - Styling
- `icon.svg` - Extension icon
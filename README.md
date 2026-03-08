[![CI](https://github.com/theluckystrike/webext-devtools/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-devtools/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-devtools)](https://www.npmjs.com/package/@theluckystrike/webext-devtools)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Last Commit](https://img.shields.io/github/last-commit/theluckystrike/webext-devtools)](https://github.com/theluckystrike/webext-devtools/commits/main)

# webext-devtools

A promise-based wrapper for Chrome DevTools API. Simplifies working with Chrome's developer tools APIs by converting callback-based methods to modern async/await promises.

## Installation

```bash
npm install @theluckystrike/webext-devtools
```

## Usage

```typescript
import { WebExtDevTools } from '@theluckystrike/webext-devtools';

// Evaluate JavaScript in the inspected page
const [result, exception] = await WebExtDevTools.inspectedWindow.eval('document.title');

// Reload the inspected window
WebExtDevTools.inspectedWindow.reload();

// Get HAR log for network requests
const harLog = await WebExtDevTools.network.getHAR();

// Listen for network requests
WebExtDevTools.network.onRequestFinished((request) => {
  console.log('Request URL:', request.request.url);
});

// Create a DevTools panel
const panel = await WebExtDevTools.panels.create(
  'My Panel',
  'icons/panel.png',
  'panel.html'
);

// Create a sidebar pane in the Elements panel
const sidebar = await WebExtDevTools.panels.elements.createSidebarPane('My Pane');
```

## API Reference

### `WebExtDevTools.inspectedWindow`

#### `eval(expression, options?)`
Evaluates a JavaScript expression in the context of the inspected page.

- **expression** `(string)`: The JavaScript expression to evaluate
- **options** `(object?)`: Optional evaluation options
- **Returns**: `Promise<[result, exception]>` - Tuple containing the result and any exception

#### `reload(reloadOptions?)`
Reloads the inspected window.

- **reloadOptions** `(object?)`: Optional reload settings (userAgent, injectScript, etc.)

### `WebExtDevTools.network`

#### `getHAR()`
Returns HAR log containing all known network requests.

- **Returns**: `Promise<HARLog>` - The HAR log object

#### `onRequestFinished(callback)`
Fired when a network request is finished and all data is available.

- **callback** `(request) => void`: Callback receiving the network request

#### `onNavigated(callback)`
Fired when the inspected window navigates to a new page.

- **callback** `(url) => void`: Callback receiving the new URL

### `WebExtDevTools.panels`

#### `create(title, iconPath, pagePath)`
Creates an extension panel in the DevTools window.

- **title** `(string)`: Panel title
- **iconPath** `(string)`: Path to panel icon
- **pagePath** `(string)`: Path to panel HTML page
- **Returns**: `Promise<ExtensionPanel>`

### `WebExtDevTools.panels.elements`

#### `createSidebarPane(title)`
Creates a pane within the extension's Elements sidebar.

- **title** `(string)`: Pane title
- **Returns**: `Promise<ExtensionSidebarPane>`

## Project Structure

```
webext-devtools/
├── src/
│   ├── index.ts          # Main source code
│   └── index.test.ts     # Unit tests
├── dist/                 # Compiled output
├── .github/
│   └── workflows/        # GitHub Actions
├── CHANGELOG.md          # Version history
├── LICENSE               # MIT License
├── package.json          # NPM package config
├── tsconfig.json         # TypeScript config
└── README.md             # This file
```

## License

MIT

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)

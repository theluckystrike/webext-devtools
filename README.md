# webext-devtools

[![CI](https://github.com/theluckystrike/webext-devtools/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-devtools/actions)
[![npm](https://img.shields.io/npm/v/@zovo/webext-devtools)](https://www.npmjs.com/package/@zovo/webext-devtools)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@zovo/webext-devtools)](https://bundlephobia.com/package/@zovo/webext-devtools)
[![Last Commit](https://img.shields.io/github/last-commit/theluckystrike/webext-devtools)](https://github.com/theluckystrike/webext-devtools/commits/main)

A promise-based, typed wrapper for the Chrome DevTools Protocol API. Simplifies working with Chrome's developer tools APIs by converting callback-based methods to modern async/await promises with full TypeScript support.

## Features

- **Inspected Window API**: Evaluate JavaScript in the context of the inspected page and control page reloading
- **Network Monitoring**: Capture network requests, access HAR logs, and listen for navigation events
- **DevTools Panels**: Create custom extension panels in the DevTools window
- **Sidebar Panes**: Build sidebars in the Elements panel for DOM inspection and debugging
- **TypeScript Support**: Full type definitions included for intellisense and compile-time safety
- **Promise-based**: All async methods return Promises for clean async/await usage

## Installation

```bash
npm install @zovo/webext-devtools
```

## Quick Start

### 1. Configure Manifest

Add the `devtools` permission to your `manifest.json`:

```json
{
  "name": "My Extension",
  "devtools_page": "devtools.html",
  "permissions": [
    "devtools"
  ]
}
```

### 2. Create a DevTools Panel

```typescript
import { WebExtDevTools } from '@zovo/webext-devtools';

// Create a custom DevTools panel
const panel = await WebExtDevTools.panels.create(
  'My Panel',
  'icons/panel-icon.png',
  'panel.html'
);

// Listen for panelShown to interact with the panel
panel.onShown.addListener((panelWindow) => {
  console.log('Panel shown!');
});
```

### 3. Evaluate Code in Inspected Page

```typescript
import { WebExtDevTools } from '@zovo/webext-devtools';

// Evaluate JavaScript in the context of the inspected page
const [result, exception] = await WebExtDevTools.inspectedWindow.eval(
  'document.title'
);

if (!exception) {
  console.log('Page title:', result);
}

// Evaluate with options
const [computedStyle] = await WebExtDevTools.inspectedWindow.eval(
  'getComputedStyle(document.body).backgroundColor',
  { useContentScriptSettings: true }
);
```

### 4. Monitor Network Requests

```typescript
import { WebExtDevTools } from '@zovo/webext-devtools';

// Listen for completed network requests
WebExtDevTools.network.onRequestFinished((request) => {
  console.log('Request URL:', request.request.url);
  console.log('Status:', request.response.status);
  console.log('Timing:', request.timeData);
});

// Get HAR log containing all captured requests
const harLog = await WebExtDevTools.network.getHAR();
console.log('Total requests:', harLog.entries.length);

// Listen for page navigation
WebExtDevTools.network.onNavigated((url) => {
  console.log('Navigated to:', url);
});
```

### 5. Create Sidebar Pane in Elements Panel

```typescript
import { WebExtDevTools } from '@zovo/webext-devtools';

// Create a sidebar pane in the Elements panel
const sidebar = await WebExtDevTools.panels.elements.createSidebarPane('My Pane');

// Set HTML content in the sidebar
sidebar.setPageContent(`
  <div>
    <h3>Element Info</h3>
    <p>Custom debugging information here</p>
  </div>
`);
```

## API Reference

### `WebExtDevTools.inspectedWindow`

#### `eval(expression, options?)`
Evaluates a JavaScript expression in the context of the inspected page.

```typescript
const [result, exception] = await WebExtDevTools.inspectedWindow.eval(
  'document.querySelector("h1").textContent',
  { useContentScriptSettings: true }
);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `expression` | `string` | The JavaScript expression to evaluate |
| `options` | `object?` | Evaluation options (see Chrome docs) |

| Returns | Type | Description |
|---------|------|-------------|
| Result | `Promise<[any, any]>` | Tuple of [result, exception] |

#### `reload(reloadOptions?)`
Reloads the inspected window.

```typescript
WebExtDevTools.inspectedWindow.reload({
  userAgent: 'Custom User Agent',
  injectScript: 'console.log("Reloaded!")'
});
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `reloadOptions` | `object?` | Reload settings (userAgent, injectScript, etc.) |

---

### `WebExtDevTools.network`

#### `getHAR()`
Returns HAR log containing all known network requests.

```typescript
const harLog = await WebExtDevTools.network.getHAR();
for (const entry of harLog.entries) {
  console.log(entry.request.url, entry.response.status);
}
```

| Returns | Type | Description |
|---------|------|-------------|
| HARLog | `Promise<any>` | HAR log object with all captured requests |

#### `onRequestFinished(callback)`
Registers a listener for network request completion.

```typescript
WebExtDevTools.network.onRequestFinished((request) => {
  request.getContent((body) => {
    console.log('Response body:', body);
  });
});
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | `(request) => void` | Function receiving the network request |

#### `onNavigated(callback)`
Registers a listener for page navigation events.

```typescript
WebExtDevTools.network.onNavigated((url) => {
  console.log('Page navigated to:', url);
});
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | `(url) => void` | Function receiving the new URL |

---

### `WebExtDevTools.panels`

#### `create(title, iconPath, pagePath)`
Creates an extension panel in the DevTools window.

```typescript
const panel = await WebExtDevTools.panels.create(
  'My Custom Panel',
  'images/panel-icon.png',
  'panel.html'
);

panel.onHidden.addListener(() => {
  console.log('Panel hidden');
});
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | `string` | Panel title displayed in DevTools toolbar |
| `iconPath` | `string` | Path to panel icon (optional, can be empty string) |
| `pagePath` | `string` | Path to panel HTML page |

| Returns | Type | Description |
|---------|------|-------------|
| panel | `Promise<ExtensionPanel>` | The created extension panel |

---

### `WebExtDevTools.panels.elements`

#### `createSidebarPane(title)`
Creates a pane within the extension's Elements sidebar.

```typescript
const sidebar = await WebExtDevTools.panels.elements.createSidebarPane(
  'Element Properties'
);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | `string` | Pane title displayed in sidebar |

| Returns | Type | Description |
|-----------|------|-------------|
| sidebar | `Promise<ExtensionSidebarPane>` | The created sidebar pane |

---

## Manifest Configuration

For DevTools extensions, your `manifest.json` needs specific configuration:

```json
{
  "manifest_version": 3,
  "name": "My DevTools Extension",
  "version": "1.0.0",
  "devtools_page": "devtools.html",
  "permissions": [
    "devtools"
  ],
  "background": {
    "service_worker": "background.js"
  }
}
```

Create a `devtools.html` file:

```html
<!DOCTYPE html>
<html>
<head>
  <script src="devtools.js"></script>
</head>
<body></body>
</html>
```

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

## Part of @zovo/webext

`webext-devtools` is part of the @zovo/webext collection of libraries for building modern browser extensions. Check out other packages:

- [webext-tabs](https://github.com/theluckystrike/webext-tabs) - Promise-based tab management
- [webext-cookies](https://github.com/theluckystrike/webext-cookies) - Cookie utilities
- [webext-event-bus](https://github.com/theluckystrike/webext-event-bus) - Event bus for extension messaging
- [webext-context-menu](https://github.com/theluckystrike/webext-context-menu) - Context menu builder
- [webext-notifications](https://github.com/theluckystrike/webext-notifications) - Desktop notifications
- [webext-offscreen](https://github.com/theluckystrike/webext-offscreen) - Offscreen document API

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built at [zovo.one](https://zovo.one) by [theluckystrike](https://github.com/theluckystrike)

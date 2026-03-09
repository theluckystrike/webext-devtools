[![CI](https://github.com/theluckystrike/webext-devtools/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-devtools/actions)
[![npm](https://img.shields.io/npm/v/@zovo/webext-devtools)](https://www.npmjs.com/package/@zovo/webext-devtools)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

# webext-devtools

> Promise-based, typed wrapper for the Chrome DevTools Protocol API

`webext-devtools` provides a clean, promise-based API for interacting with Chrome's DevTools Protocol from browser extensions. Built with TypeScript for full type safety and intellisense.

## Features

- **Inspected Window Evaluation** — Execute JavaScript in the context of the inspected page with proper Promise semantics
- **Network Request Interception** — Hook into network request events and access HAR logs
- **Panel Creation** — Programmatically create DevTools panels with icons and custom pages
- **Sidebar Management** — Add custom sidebars to the Elements panel
- **Full TypeScript Support** — Complete type definitions for all APIs
- **Zero Dependencies** — Lightweight, minimal footprint

## Installation

```bash
npm install @zovo/webext-devtools
```

## Quick Start

### 1. Evaluate Code in the Inspected Page

Execute JavaScript in the context of the page currently open in the Chrome DevTools:

```typescript
import { WebExtDevTools } from '@zovo/webext-devtools';

// Get the current page URL
const [href] = await WebExtDevTools.inspectedWindow.eval('location.href');
console.log('Current page:', href);

// Evaluate more complex expressions
const [document] = await WebExtDevTools.inspectedWindow.eval(`
  JSON.stringify({
    title: document.title,
    forms: document.forms.length,
    scripts: document.scripts.length
  })
`);
console.log('Page data:', JSON.parse(document));
```

### 2. Monitor Network Requests

Intercept and analyze network traffic:

```typescript
import { WebExtDevTools } from '@zovo/webext-devtools';

// Listen for completed network requests
WebExtDevTools.network.onRequestFinished((request) => {
  console.log('Request URL:', request.request.url);
  console.log('Method:', request.request.method);
  console.log('Status:', request.response.status);
  
  // Get request post data
  request.getContent((content, encoding) => {
    console.log('Response body:', content);
  });
});

// Listen for page navigations
WebExtDevTools.network.onNavigated((url) => {
  console.log('Navigated to:', url);
});

// Get HAR log of all network requests
const harLog = await WebExtDevTools.network.getHAR();
console.log('Total requests:', harLog.entries.length);
```

### 3. Create DevTools Panels

Build custom panels integrated into Chrome DevTools:

```typescript
import { WebExtDevTools } from '@zovo/webext-devtools';

// Create a new DevTools panel
const panel = await WebExtDevTools.panels.create(
  'My Extension Panel',  // Panel title
  'images/icon.png',     // Panel icon
  'panel.html'          // Panel page
);

console.log('Panel created:', panel.name);
```

### 4. Add Sidebars to the Elements Panel

Extend the Elements panel with custom sidebar panes:

```typescript
import { WebExtDevTools } from '@zovo/webext-devtools';

// Create a sidebar pane in the Elements panel
const sidebar = await WebExtDevTools.panels.elements.createSidebarPane(
  'My Sidebar'
);

// Set the sidebar content
sidebar.setObject({
  nodeType: 'element',
  tagName: 'div',
  id: 'app'
});

// Or set HTML content
sidebar.setContent('<h1>Element Details</h1><p>Custom content here</p>');
```

### 5. Reload the Inspected Page

Control page reloading from your extension:

```typescript
import { WebExtDevTools } from '@zovo/webext-devtools';

// Reload with custom options
WebExtDevTools.inspectedWindow.reload({
  ignoreCache: true,
  userAgent: 'Custom Agent',
  injectedScript: 'console.log("Injected!")'
});
```

## API Reference

### `WebExtDevTools.inspectedWindow`

| Method | Signature | Description |
|--------|-----------|-------------|
| `eval` | `(expression: string, options?: EvalOptions) => Promise<[any, any]>` | Evaluates JavaScript in the inspected page. Returns `[result, exception]`. |
| `reload` | `(reloadOptions?: ReloadOptions) => void` | Reloads the inspected page with optional settings. |

### `WebExtDevTools.network`

| Method | Signature | Description |
|--------|-----------|-------------|
| `getHAR` | `() => Promise<HARLog>` | Returns HAR log containing all known network requests. |
| `onRequestFinished` | `(callback: (request: Request) => void) => void` | Registers a listener for completed network requests. |
| `onNavigated` | `(callback: (url: string) => void) => void` | Registers a listener for page navigation events. |

### `WebExtDevTools.panels`

| Method | Signature | Description |
|--------|-----------|-------------|
| `create` | `(title: string, iconPath: string, pagePath: string) => Promise<ExtensionPanel>` | Creates a new DevTools panel. |

### `WebExtDevTools.panels.elements`

| Method | Signature | Description |
|--------|-----------|-------------|
| `createSidebarPane` | `(title: string) => Promise<ExtensionSidebarPane>` | Creates a sidebar pane in the Elements panel. |

## Required Permissions

To use `webext-devtools`, your extension must declare the `devtools` permission in `manifest.json`:

```json
{
  "manifest_version": 3,
  "name": "My Extension",
  "permissions": [
    "devtools"
  ]
}
```

The `devtools` permission is required to access the `chrome.devtools` API. No additional permissions are needed for basic usage.

## Part of @zovo/webext

`webext-devtools` is part of the `@zovo/webext` family of packages, providing modular utilities for building modern browser extensions:

- [@zovo/webext-devtools](/theluckystrike/webext-devtools) — DevTools Protocol wrapper
- [@zovo/webext-storage](/theluckystrike/webext-storage) — Storage utilities
- [@zovo/webext-messaging](/theluckystrike/webext-messaging) — Cross-context messaging

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)

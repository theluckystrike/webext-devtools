[![CI](https://github.com/theluckystrike/webext-devtools/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-devtools/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-devtools)](https://www.npmjs.com/package/@theluckystrike/webext-devtools)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@theluckystrike/webext-devtools)](https://bundlephobia.com/package/@theluckystrike/webext-devtools)

# webext-devtools

> Promise-based, typed wrapper for the Chrome DevTools Protocol API

A modern, TypeScript-first library that provides promise-based wrappers around the Chrome DevTools Protocol APIs. Simplifies building Chrome DevTools extensions by converting callback-based APIs to clean, awaitable promises.

## Features

- **Inspected Window Evaluation** — Execute JavaScript in the context of the inspected page with full TypeScript support
- **Network Request Interception** — Monitor and analyze network requests using HAR logs and request callbacks
- **Panel Creation** — Create custom DevTools panels with ease
- **Sidebar Management** — Add custom sidebars to the Elements panel
- **Full TypeScript Support** — Complete type definitions for all APIs

## Installation

```bash
npm install @theluckystrike/webext-devtools
# or
pnpm add @theluckystrike/webext-devtools
# or
yarn add @theluckystrike/webext-devtools
```

## Quick Start

### Evaluate Code in Inspected Page

```typescript
import { WebExtDevTools } from '@theluckystrike/webext-devtools';

// Execute JavaScript in the context of the inspected page
const [result, exception] = await WebExtDevTools.inspectedWindow.eval(
  'document.title'
);

if (!exception) {
  console.log('Page title:', result);
}
```

### Create a DevTools Panel

```typescript
import { WebExtDevTools } from '@theluckystrike/webext-devtools';

// Create a custom DevTools panel
const panel = await WebExtDevTools.panels.create(
  'My Panel',
  'images/panel-icon.png',
  'panel.html'
);

// Listen for panel visibility changes
panel.onShown.addListener((window) => {
  console.log('Panel is now visible');
});
```

### Monitor Network Requests

```typescript
import { WebExtDevTools } from '@theluckystrike/webext-devtools';

// Listen for all finished network requests
WebExtDevTools.network.onRequestFinished((request) => {
  console.log('Request URL:', request.request.url);
  console.log('Response status:', request.response.status);
  
  // Get request post data
  request.getPostData((postData) => {
    console.log('Post data:', postData);
  });
});

// Get HAR log containing all network requests
const harLog = await WebExtDevTools.network.getHAR();
console.log('Total requests:', harLog.entries.length);
```

### Add Sidebar to Elements Panel

```typescript
import { WebExtDevTools } from '@theluckystrike/webext-devtools';

// Create a sidebar pane in the Elements panel
const sidebar = await WebExtDevTools.panels.elements.createSidebarPane(
  'My Custom Sidebar'
);

// Set sidebar content
sidebar.setObject({ 
  title: 'Element Info',
  selected: true,
  children: 3 
});
```

## API Reference

### `WebExtDevTools.inspectedWindow`

| Method | Signature | Description |
|--------|-----------|-------------|
| `eval` | `(expression: string, options?: EvalOptions) => Promise<[any, DevToolsException]>` | Evaluates a JavaScript expression in the context of the inspected page |
| `reload` | `(reloadOptions?: ReloadOptions) => void` | Reloads the inspected window |

### `WebExtDevTools.network`

| Method | Signature | Description |
|--------|-----------|-------------|
| `getHAR` | `() => Promise<HARLog>` | Returns HAR log containing all known network requests |
| `onRequestFinished` | `(callback: (request: Request) => void) => void` | Fired when a network request finishes |
| `onNavigated` | `(callback: (url: string) => void) => void` | Fired when the inspected window navigates |

### `WebExtDevTools.panels`

| Method | Signature | Description |
|--------|-----------|-------------|
| `create` | `(title: string, iconPath: string, pagePath: string) => Promise<ExtensionPanel>` | Creates a DevTools panel |

### `WebExtDevTools.panels.elements`

| Method | Signature | Description |
|--------|-----------|-------------|
| `createSidebarPane` | `(title: string) => Promise<ExtensionSidebarPane>` | Creates a sidebar pane in the Elements panel |

## Permissions

To use this library, your extension needs the `devtools` permission in `manifest.json`:

```json
{
  "name": "My DevTools Extension",
  "version": "1.0.0",
  "manifest_version": 3,
  "permissions": [
    "devtools"
  ]
}
```

## Part of @zovo/webext

`webext-devtools` is part of the `@zovo/webext` ecosystem — a collection of modern, promise-based wrappers for Web Extension APIs.

- [@zovo/webext-runtime](https://github.com/theluckystrike/webext-runtime) — chrome.runtime API
- [@zovo/webext-tabs](https://github.com/theluckystrike/webext-tabs) — chrome.tabs API
- [@zovo/webext-storage](https://github.com/theluckystrike/webext-storage) — chrome.storage API

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)

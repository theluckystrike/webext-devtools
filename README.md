<div align="center">

# @theluckystrike/webext-devtools

Promise-based wrapper for the Chrome DevTools API. Inspect windows, monitor network requests, and create custom panels.

[![npm version](https://img.shields.io/npm/v/@theluckystrike/webext-devtools)](https://www.npmjs.com/package/@theluckystrike/webext-devtools)
[![npm downloads](https://img.shields.io/npm/dm/@theluckystrike/webext-devtools)](https://www.npmjs.com/package/@theluckystrike/webext-devtools)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@theluckystrike/webext-devtools)

[Installation](#installation) · [Quick Start](#quick-start) · [API](#api) · [License](#license)

</div>

---

## Features

- **Inspected window** -- evaluate expressions in the inspected page
- **Network API** -- get HAR logs and monitor network requests
- **Panels API** -- create custom DevTools panels and sidebar panes
- **Promise-based** -- async/await instead of callbacks
- **Typed** -- full TypeScript support for all DevTools APIs
- **Zero dependencies** -- just TypeScript and Chrome APIs

## Installation

```bash
npm install @theluckystrike/webext-devtools
```

<details>
<summary>Other package managers</summary>

```bash
pnpm add @theluckystrike/webext-devtools
# or
yarn add @theluckystrike/webext-devtools
```

</details>

## Quick Start

```typescript
import { WebExtDevTools } from "@theluckystrike/webext-devtools";

// Evaluate in inspected page
const [result, exception] = await WebExtDevTools.inspectedWindow.eval("document.title");

// Get HAR log
const har = await WebExtDevTools.network.getHAR();

// Create a custom panel
const panel = await WebExtDevTools.panels.create("My Panel", "icon.png", "panel.html");

// Monitor network requests
WebExtDevTools.network.onRequestFinished((request) => {
  console.log(request.request.url);
});
```

## API

| Namespace | Method | Description |
|-----------|--------|-------------|
| `inspectedWindow` | `eval(expr, opts?)` | Evaluate JS in the inspected page |
| `inspectedWindow` | `reload(opts?)` | Reload the inspected page |
| `network` | `getHAR()` | Get full HAR log |
| `network` | `onRequestFinished(cb)` | Listen for completed requests |
| `network` | `onNavigated(cb)` | Listen for page navigations |
| `panels` | `create(title, icon, page)` | Create a DevTools panel |
| `panels.elements` | `createSidebarPane(title)` | Create an Elements sidebar pane |

## Permissions

Requires a `devtools_page` entry in your manifest:

```json
{ "devtools_page": "devtools.html" }
```

## Part of @zovo/webext

This package is part of the [@zovo/webext](https://github.com/theluckystrike) family -- typed, modular utilities for Chrome extension development:

| Package | Description |
|---------|-------------|
| [webext-storage](https://github.com/theluckystrike/webext-storage) | Typed storage with schema validation |
| [webext-messaging](https://github.com/theluckystrike/webext-messaging) | Type-safe message passing |
| [webext-tabs](https://github.com/theluckystrike/webext-tabs) | Tab query helpers |
| [webext-cookies](https://github.com/theluckystrike/webext-cookies) | Promise-based cookies API |
| [webext-i18n](https://github.com/theluckystrike/webext-i18n) | Internationalization toolkit |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License -- see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [theluckystrike](https://github.com/theluckystrike) · [zovo.one](https://zovo.one)

</div>

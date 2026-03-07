[![CI](https://github.com/theluckystrike/webext-devtools/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-devtools/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-devtools)](https://www.npmjs.com/package/@theluckystrike/webext-devtools)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# webext-devtools

Promise-based wrapper for Chrome DevTools API.

## Installation

```bash
npm install webext-devtools
```

## Usage

```typescript
import { WebExtDevTools } from 'webext-devtools';

const [result, exception] = await WebExtDevTools.inspectedWindow.eval('location.href');
```

## License

MIT

---

Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)

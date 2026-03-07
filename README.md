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

---
built by [zovo.one](https://zovo.one)

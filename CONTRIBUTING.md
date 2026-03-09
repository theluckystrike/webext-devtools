# Contributing to webext-devtools

Thank you for your interest in contributing to webext-devtools! This document outlines the process for contributing to this project.

## Getting Started

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-devtools.git
   cd webext-devtools
   ```

### Install Dependencies

```bash
npm install
```

### Create a Branch

Create a feature branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Type Checking

```bash
npx tsc --noEmit
```

## Pull Request Process

1. **Ensure all tests pass** — Run `npm test` and `npm run build` before submitting
2. **Update documentation** — If your changes affect the API, update the README accordingly
3. **Follow code style** — This project uses TypeScript with default settings
4. **Write descriptive commit messages** — Clear commit messages help maintainers understand your changes
5. **Submit a Pull Request** — Push your branch and open a PR against the `main` branch

## Code of Conduct

Please be respectful and considerate when contributing. We aim to maintain a welcoming and inclusive community.

## Questions?

If you have questions about contributing, feel free to open an issue or reach out through GitHub discussions.

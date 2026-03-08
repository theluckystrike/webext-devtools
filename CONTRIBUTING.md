# Contributing to webext-devtools

Thank you for your interest in contributing to `webext-devtools`! This document outlines the process for contributing to this project.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](https://github.com/theluckystrike/webext-devtools/blob/main/CODE_OF_CONDUCT.md). Please report unacceptable behavior to the maintainers.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+
- TypeScript knowledge

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/webext-devtools.git
   cd webext-devtools
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run tests:
   ```bash
   npm test
   ```

5. Build the project:
   ```bash
   npm run build
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report:
- Check the [issues](https://github.com/theluckystrike/webext-devtools/issues) to see if the bug has already been reported
- Create a minimal reproduction of the bug

When filing a bug report, include:
- A quick summary and background
- Steps to reproduce
- What you expected vs what happened
- Notes (possibly including why you think this might be happening)

### Suggesting Features

First, check if the feature has been discussed before. Then, open an issue with:
- A clear, descriptive title
- A detailed description of the proposed feature
- Explain why this feature would be useful

### Pull Requests

1. Fork the repo and create your branch from `main`:
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. Make your changes and ensure tests pass:
   ```bash
   npm test
   ```

3. Commit your changes with clear commit messages:
   ```bash
   git commit -m 'feat: add new feature'
   ```

4. Push to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```

5. Open a Pull Request against the `main` branch

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Coding Standards

- Use TypeScript for all new code
- Follow the existing code style
- Add type annotations where beneficial
- Write tests for new features
- Keep changes focused and atomic

## Project Structure

```
webext-devtools/
├── src/
│   ├── index.ts          # Main library code
│   └── index.test.ts     # Unit tests
├── dist/                 # Compiled output (generated)
├── .github/
│   └── workflows/        # CI/CD workflows
├── CHANGELOG.md          # Version history
└── package.json          # Package configuration
```

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test -- --run
```

## Building

```bash
# Build the project
npm run build

# The output will be in the dist/ directory
```

## Additional Resources

- [Chrome DevTools Extension API](https://developer.chrome.com/docs/extensions/mv3/devtools/)
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)

## Questions?

If you have questions, feel free to open an issue with the `question` label or reach out to the maintainers.

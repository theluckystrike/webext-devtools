# Contributing to webext-devtools

Thank you for your interest in contributing to `webext-devtools`! This document outlines the process for contributing to this project.

## Getting Started

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/webext-devtools.git
cd webext-devtools
```

### Install Dependencies

This project uses npm for dependency management:

```bash
npm install
```

### Set Up Development Environment

```bash
# Install Node.js dependencies
npm install

# Build the TypeScript project
npm run build

# Run tests
npm test
```

## Making Changes

### Create a Feature Branch

Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/my-new-feature
# or
git checkout -b fix/bug-description
```

### Code Style

- Use TypeScript for all new code
- Follow the existing code style and conventions
- Ensure type safety (no `any` unless absolutely necessary)
- Add JSDoc comments for public APIs

### Testing

Run the test suite before submitting changes:

```bash
npm test
```

Add tests for new functionality when appropriate.

### Commit Messages

Follow conventional commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test updates
- `refactor:` for code refactoring

Example:
```
feat: add network request interception handlers
```

## Submitting Changes

### Push Your Branch

```bash
git push origin feature/my-new-feature
```

### Create a Pull Request

1. Navigate to the original repository
2. Click "New Pull Request"
3. Select your branch and submit
4. Fill in the PR description with:
   - What the change does
   - Why it's needed
   - How to test it

### PR Review Process

- Maintainers will review your code
- Address any feedback or requested changes
- Once approved, your changes will be merged

## Project Structure

```
webext-devtools/
├── src/
│   └── index.ts       # Main source code
├── dist/              # Compiled JavaScript
├── README.md          # Documentation
├── LICENSE            # MIT License
├── package.json       # npm package config
└── tsconfig.json      # TypeScript config
```

## Getting Help

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones

## Code of Conduct

Be respectful and inclusive. Follow the [GitHub Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines).

---

Thank you for contributing!

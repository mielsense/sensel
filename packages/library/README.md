# Sensel

A modern component and action library for Svelte 5+.

[![npm version](https://img.shields.io/npm/v/sensel.svg)](https://www.npmjs.com/package/sensel)
[![License](https://img.shields.io/npm/l/sensel.svg)](https://github.com/mielsense/sensel/blob/main/LICENSE)

## Overview

Sensel is a lightweight, flexible library that provides a collection of reusable components and actions for Svelte 5 and above. Built with modern Svelte features in mind, it aims to enhance your development workflow while maintaining optimal performance.

## Installation

```bash
# Using npm
npm install sensel

# Using pnpm
pnpm add sensel

# Using yarn
yarn add sensel
```

## Requirements

- Svelte 5.0.0 or higher

## Usage

### Components

Import components directly from the package:

```svelte
<script>
  import { ComponentName } from 'sensel';
</script>

<ComponentName />
```

### Actions

Import actions using the `use:` directive:

```svelte
<script>
  import { actionName } from 'sensel/actions';
</script>

<div use:actionName={options} />
```

## Documentation

For detailed documentation and examples, please visit our [documentation site](#).

## Features

- Built specifically for Svelte 5+
- Tree-shakeable exports
- TypeScript support
- Zero dependencies
- SSR compatible
- Lightweight and performant

### Development Setup

```bash
git clone https://github.com/mielsense/sensel.git
cd sensel
pnpm install
pnpm dev
```

## Testing

```bash
pnpm test
```

## Building

```bash
pnpm build
```

## License

[MIT](LICENSE)

## Author

Created and maintained by [mielsense](https://github.com/mielsense).

## Support

- Create an [issue](https://github.com/mielsense/sensel/issues)
- Follow updates on [Twitter](#)
- Join our [Discord community](#)

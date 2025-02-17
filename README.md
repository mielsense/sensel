# sensel

```
          |\      _,,,---,,_
    ZZZzz /,`.-'``'    -.  ;-;;,_
         |,4-  ) )-,_. ,\ (  `'-'
        '---''(_/--'  `-'\_)  sensel
```

[![npm version](https://img.shields.io/npm/v/@sensel/ui.svg?color=0c0)](https://www.npmjs.com/package/@sensel/ui)
[![npm version](https://img.shields.io/npm/v/@sensel/cli.svg?color=0c0)](https://www.npmjs.com/package/@sensel/cli)
[![License](https://img.shields.io/badge/license-MIT-0c0.svg)](LICENSE.md)
[![Built with Svelte](https://img.shields.io/badge/built%20with-svelte-0c0.svg)](https://svelte.dev)

A beautiful, accessible component/action library for Svelte 5, with a powerful CLI for seamless integration.

> [!NOTE]
> Documentation available soon at: [Not available yet]()

## 🌟 Features

- 🎨 Beautiful, customizable components
- ♿ Accessibility-first design
- 🚀 Svelte 5 ready
- 🛠️ Powerful CLI for component management
- 🎯 Type-safe with TypeScript
- 🎭 Style variants with tailwind-variants
- 🎨 Tailwind CSS styling

## 📦 Installation

### Option 1: Full Library Installation

```bash
npm install @sensel/ui
```

```bash
npm install @sensel/motion
```

### Option 2: CLI + Individual Components

1. Initialize a new project:
```bash
npx @sensel/cli init my-project
cd my-project
npm install
```

2. Add components as needed:
```bash
npx @sensel/cli add button
npx @sensel/cli add card
```

3. Remove components when not needed:
```bash
npx @sensel/cli remove button
```

## 🎨 Components

The component library is built on top of [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte), extending it with additional features and customizations.

### Available Components and Actions

Each component can be installed individually using the CLI:

```bash
sensel add <item-name>
```

## 🛠️ CLI Commands

| Command | Description |
|---------|-------------|
| `npx @sensel/cli init <project-name>` | Initialize a new project using the template |
| `npx @sensel/cli add <item-name>` | Add a component to your project |
| `npx @sensel/cli remove <item-name>` | Remove a component from your project |

## 📝 License

Licensed under the [MIT License](LICENSE).

## 🤝 Contributing

Currently not open for contributions.

## 🙏 Acknowledgments

This project builds upon [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte) for its base components.

---

<div align="center">
  Made with 🖤 by miel
</div>

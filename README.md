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

<div align="center">
  <img src="https://i.ibb.co/YBD5JjK5/Svelte.png" alt="Svelte Logo" width="350">
  <img src="https://i.ibb.co/zhS35pYb/Type-Script-Icon.png" alt="TypeScript Logo" width="350">
</div>

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
- 🍊 Animated icons imporation via cli
- 💜 Motion.dev wrapper 


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
npx @sensel/cli icon user
```

3. Remove components/actions/icons when not needed:
```bash
npx @sensel/cli remove button
npx @sensel/cli remove pixelate
npx @sensel/cli remove user
```

## 🎨 Components

The component library is built on top of [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte), extending it with additional features and customizations.

### Available Components and Actions

Each component can be installed individually using the CLI:

```bash
sensel add <item-name>
```

## 🍊 Icons

The animated icons come from [ji3sr/icons](https://github.com/jis3r/icons), all credits given to the original authors.

## 💜 Motion wrapper

This is a svelte wrapper around the [motion](https://motion.dev) library !




## 🛠️ CLI Commands

| Command | Description |
|---------|-------------|
| `npx @sensel/cli init <project-name>` | Initialize a new project using the template |
| `npx @sensel/cli add <item-name>` | Add a component/action to your project |
| `npx @sensel/cli icon <icon-name>` | Add an icon to your project |
| `npx @sensel/cli remove <item-name/icon-name>` | Remove a component from your project |

## 📝 License

Licensed under the [MIT License](LICENSE).

## 🤝 Contributing

Currently not open for contributions.

## 🙏 Acknowledgments

This project builds upon [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte) for its base components.<br>
This project uses [ji3sr/icons](https://github.com/jis3r/icons) for all its animated icons.<br>
This project provides a wrapper around the awsome [motion](https://motion.dev) library.

---

<div align="center">
  Made with 🖤 by miel
</div>

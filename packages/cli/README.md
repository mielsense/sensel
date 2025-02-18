# sensel

```
          |\      _,,,---,,_
    ZZZzz /,`.-'``'    -.  ;-;;,_
         |,4-  ) )-,_. ,\ (  `'-'
        '---''(_/--'  `-'\_)  sensel cli
```

A powerful CLI to seamlessly integrate sensel into your project.

> [!NOTE]
> Documentation available soon at: [Not available yet]()

## 📦 Installation

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

## 🍊 Icons

The animated icons come from [ji3sr/icons](https://github.com/jis3r/icons), all credits given to the original authors.

## 🛠️ CLI Commands

| Command | Description |
|---------|-------------|
| `npx @sensel/cli init <project-name>` | Initialize a new project using the template |
| `npx @sensel/cli add <item-name>` | Add a component/action to your project |
| `npx @sensel/cli icon <icon-name>` | Add an icon to your project |
| `npx @sensel/cli remove <item-name/icon-name>` | Remove a component from your project |


## 🤝 Contributing

Currently not open for contributions.

---

<div align="center">
  Made with 🖤 by miel
</div>

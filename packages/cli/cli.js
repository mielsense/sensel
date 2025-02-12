#!/usr/bin/env node
import { program } from "commander";
import { addComponent } from "./commands/add.js";
import { removeComponent } from "./commands/remove.js";
import { initProject } from "./commands/init.js";
import fs from "fs";

let packageManager = "npm";
if (fs.existsSync("pnpm-lock.yaml")) {
    packageManager = "pnpm";
} else if (fs.existsSync("bun.lockb")) {
    packageManager = "bun";
}

program
    .name("sensel")
    .description(
        "A CLI to add, remove, and initialize components in your project",
    )
    .version("0.0.1")
    .on("--help", () => {
        console.log(`
    Usage:
      ${packageManager === "pnpm" ? "pnpx" : packageManager === "bun" ? "bunx" : "npx"} sensel <command> [options]

    Example:
      ${packageManager === "pnpm" ? "pnpx" : packageManager === "bun" ? "bunx" : "npx"} sensel add <component name>
    `);
    });

program
    .command("add")
    .argument("<component name>", "The name of the component to add")
    .description("Adds a component to your project")
    .action(addComponent);

program
    .command("remove")
    .argument("<component name>", "The name of the component to remove")
    .description("Removes a component from your project")
    .action(removeComponent);

program
    .command("init")
    .argument(
        "<project name>",
        'The name of the project to initialize (or "." for the current directory)',
    )
    .description("Initializes a new project from a base template")
    .action(initProject);

program.parse(process.argv);

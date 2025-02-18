import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";

function convertAliasPath(aliasPath) {
    return aliasPath.replace(/^\$lib/, "./src/lib");
}

async function getConfig() {
    const configPath = path.resolve(process.cwd(), "sensel.config.json");
    if (!fs.existsSync(configPath)) {
        throw new Error(
            "sensel.config.json not found. Please run `sensel init` first.",
        );
    }
    return fs.readJson(configPath);
}

export async function removeComponent(name) {
    const spinner = ora({
        text: `${chalk.cyan("✨")} Removing ${chalk.bold.green(name)}...`,
        color: "yellow",
    }).start();

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
        spinner.text = `${chalk.cyan("📂")} Loading configuration...`;
        await sleep(500);

        const config = await getConfig();

        spinner.text = `${chalk.cyan("🔍")} Locating component/action/icon...`;
        await sleep(500);

        const componentDir = path.resolve(
            process.cwd(),
            convertAliasPath(config.aliases.components),
            name,
        );
        const actionDir = path.resolve(
            process.cwd(),
            convertAliasPath(config.aliases.actions),
            name,
        );
        const iconDir = config.aliases.icons
            ? path.resolve(
                  process.cwd(),
                  convertAliasPath(config.aliases.icons),
                  name,
              )
            : null;

        let dirToRemove;
        if (fs.existsSync(componentDir)) {
            dirToRemove = componentDir;
        } else if (fs.existsSync(actionDir)) {
            dirToRemove = actionDir;
        } else if (iconDir && fs.existsSync(iconDir)) {
            dirToRemove = iconDir;
        } else {
            throw new Error(`Component, action, or icon '${name}' not found`);
        }

        spinner.text = `${chalk.cyan("🗑️")} Removing files...`;
        await sleep(500);

        await fs.remove(dirToRemove);

        spinner.succeed(
            chalk.green(`🎉 Removed ${chalk.bold(name)} successfully!`),
        );
    } catch (error) {
        spinner.fail(chalk.red(`Failed to remove ${name}: ${error.message}`));
    }
}

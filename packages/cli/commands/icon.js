import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { execSync } from "child_process";

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

export async function addIcon(name) {
    const spinner = ora({
        text: `${chalk.cyan("✨")} Adding icon ${chalk.bold.green(name)}...`,
        color: "yellow",
    }).start();

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
        spinner.text = `${chalk.cyan("📂")} Loading configuration...`;
        await sleep(500);
        const config = await getConfig();

        spinner.text = `${chalk.cyan("📂")} Preparing temporary directory...`;
        await sleep(500);
        const tempDir = path.join(process.cwd(), ".sensel-temp");
        await fs.ensureDir(tempDir);

        spinner.text = `${chalk.cyan("🔍")} Cloning repository...`;
        execSync(
            `git clone --quiet https://github.com/mielsense/sensel.git ${tempDir}`,
            { stdio: "pipe" },
        );

        const sourceDir = path.join(
            tempDir,
            "packages/library/src/lib/icons/animated",
            name,
        );
        if (!fs.existsSync(sourceDir)) {
            throw new Error(`Icon '${name}' not found in the repository`);
        }

        const iconAlias = config.aliases.icons || "icons/animated";
        const destinationDir = path.resolve(
            process.cwd(),
            convertAliasPath(iconAlias),
            name,
        );

        spinner.text = `${chalk.cyan("📋")} Installing icon...`;
        await sleep(500);
        await fs.ensureDir(path.dirname(destinationDir));
        await fs.copy(sourceDir, destinationDir);
        await fs.remove(tempDir);

        spinner.succeed(
            chalk.green(`🎉 Added icon ${chalk.bold(name)} successfully!`),
        );
    } catch (error) {
        const tempDir = path.join(process.cwd(), ".sensel-temp");
        if (fs.existsSync(tempDir)) {
            await fs.remove(tempDir);
        }
        spinner.fail(chalk.red(`Failed to add icon ${name}: ${error.message}`));
    }
}

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

export async function addComponent(name) {
    const spinner = ora({
        text: `${chalk.cyan("✨")} Adding ${chalk.bold.green(name)}...`,
        color: "yellow",
    }).start();

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
        spinner.text = `${chalk.cyan("📂")} Loading configuration...`;
        await sleep(500);

        const config = await getConfig();

        const tempDir = path.join(process.cwd(), ".sensel-temp");
        await fs.ensureDir(tempDir);

        spinner.text = `${chalk.cyan("🔍")} Locating component...`;
        execSync(
            `git clone --quiet https://github.com/mielsense/sensel.git ${tempDir}`,
            { stdio: "pipe" },
        );

        // Check component and action paths in the monorepo
        const componentSourceDir = path.join(
            tempDir,
            "packages/library/src/lib/components/ui",
            name,
        );
        const actionSourceDir = path.join(
            tempDir,
            "packages/library/src/lib/actions/ui",
            name,
        );

        let destinationDir;
        let sourceDir;
        let sourceType;

        if (fs.existsSync(componentSourceDir)) {
            destinationDir = path.resolve(
                process.cwd(),
                convertAliasPath(config.aliases.components),
                name,
            );
            sourceDir = componentSourceDir;
            sourceType = "component";
        } else if (fs.existsSync(actionSourceDir)) {
            destinationDir = path.resolve(
                process.cwd(),
                convertAliasPath(config.aliases.actions),
                name,
            );
            sourceDir = actionSourceDir;
            sourceType = "action";
        } else {
            throw new Error(`Component or action '${name}' not found`);
        }

        spinner.text = `${chalk.cyan("📋")} Installing ${sourceType}...`;
        await sleep(500);

        await fs.ensureDir(path.dirname(destinationDir));
        await fs.copy(sourceDir, destinationDir);

        await fs.remove(tempDir);

        spinner.succeed(
            chalk.green(`🎉 Added ${chalk.bold(name)} successfully!`),
        );
    } catch (error) {
        const tempDir = path.join(process.cwd(), ".sensel-temp");
        if (fs.existsSync(tempDir)) {
            await fs.remove(tempDir);
        }
        spinner.fail(chalk.red(`Failed to add ${name}: ${error.message}`));
    }
}

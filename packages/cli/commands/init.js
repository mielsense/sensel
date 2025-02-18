import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { execSync } from "child_process";

function convertAliasPath(aliasPath) {
    return aliasPath.replace(/^\$lib/, "./src/lib");
}

export async function initProject(projectName) {
    console.log(
        chalk.yellow(`
          |\\      _,,,---,,_
    ZZZzz /,\`.-''\`'    -.  ;-;;,_
         |,4-  ) )-,_. ,\\ (  \`'-'
        '---''(_/--'  \`-'\\_)  ${chalk.red("sensel")}
        `),
    );

    const spinner = ora({
        text: `${chalk.cyan("✨")} Initializing project ${chalk.bold.green(projectName)}...`,
        color: "yellow",
    }).start();

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
        spinner.text = `${chalk.cyan("🎯")} Creating project structure...`;
        await sleep(500);

        const destinationDir =
            projectName === "."
                ? process.cwd()
                : path.resolve(process.cwd(), projectName);

        const tempDir = path.join(process.cwd(), ".sensel-temp");
        await fs.ensureDir(tempDir);

        spinner.text = `${chalk.cyan("📂")} Preparing template...`;
        execSync(
            `git clone --quiet https://github.com/mielsense/sensel.git ${tempDir}`,
            { stdio: "pipe" },
        );

        await fs.ensureDir(destinationDir);
        await fs.copy(path.join(tempDir, "template"), destinationDir);
        await fs.remove(tempDir);

        // Update package.json
        spinner.text = `${chalk.cyan("📦")} Configuring project...`;
        await sleep(500);

        const projectDirName =
            projectName === "." ? path.basename(process.cwd()) : projectName;
        const packageJsonPath = path.join(destinationDir, "package.json");
        const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, "utf-8"),
        );
        packageJson.name = projectDirName;
        fs.writeFileSync(
            packageJsonPath,
            JSON.stringify(packageJson, null, 2),
            "utf-8",
        );

        spinner.stop();

        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "componentsAlias",
                message: `${chalk.yellow("📍")} Where do you want to install components? (e.g., $lib/components/ui)`,
                default: "$lib/components/ui",
            },
            {
                type: "input",
                name: "actionsAlias",
                message: `${chalk.yellow("🚀")} Where do you want to install actions? (e.g., $lib/actions/ui)`,
                default: "$lib/actions/ui",
            },
            {
                type: "input",
                name: "iconsAlias",
                message: `${chalk.yellow("🎨")} Where do you want to install icons? (e.g., $lib/icons/animated)`,
                default: "$lib/icons/animated",
            },
        ]);

        spinner.start();
        spinner.text = `${chalk.cyan("⚙️")} Finalizing setup...`;
        await sleep(500);

        const config = {
            style: "default",
            tailwind: {
                config: "tailwind.config.ts",
                css: "src/app.css",
            },
            aliases: {
                components: answers.componentsAlias,
                utils: "$lib/utils",
                ui: "$lib/components/ui",
                hooks: "$lib/hooks",
                actions: answers.actionsAlias,
                icons: answers.iconsAlias,
            },
            typescript: true,
        };

        const configPath = path.join(destinationDir, "sensel.config.json");
        await fs.writeJson(configPath, config, { spaces: 4 });

        // Create directories with converted paths
        await fs.ensureDir(
            path.resolve(
                destinationDir,
                convertAliasPath(answers.componentsAlias),
            ),
        );
        await fs.ensureDir(
            path.resolve(
                destinationDir,
                convertAliasPath(answers.actionsAlias),
            ),
        );
        await fs.ensureDir(
            path.resolve(destinationDir, convertAliasPath(answers.iconsAlias)),
        );

        // Install dependencies
        console.log("\n");
        spinner.text = `${chalk.cyan("📦")} Installing dependencies...`;
        execSync("pnpm install", { cwd: destinationDir, stdio: "inherit" });

        spinner.succeed(
            chalk.green(
                `🎉 Project ${chalk.bold.green(projectName)} initialized successfully!\n`,
            ),
        );

        if (projectName !== ".") {
            console.log(chalk.cyan(`\nNext steps:`));
            console.log(chalk.white(`  cd ${projectName}`));
            console.log(chalk.white(`  pnpm dev\n`));
        } else {
            console.log(chalk.cyan(`\nNext steps:`));
            console.log(chalk.white(`  pnpm dev\n`));
        }
    } catch (error) {
        spinner.fail(
            chalk.red(`Failed to initialize project: ${error.message}`),
        );
        if (fs.existsSync(destinationDir)) {
            await fs.remove(destinationDir);
        }
    }
}

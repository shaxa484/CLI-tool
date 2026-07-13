import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { input, select, confirm } from '@inquirer/prompts';

export default function initCommand() {
    const targetDir = process.cwd();
    const folderName = path.basename(targetDir);

    console.log(chalk.blue(`Let's initialize a new project in ${chalk.bold(targetDir)}...`));


    try {
        const projectName = await input({
            message: 'What is your project name?',
            default: defaultName,
        });
        const projectType = await select({
            message: 'Select the project type:',
            choices: [
                {
                    name: 'Frontend (React + Vite)',
                    value: 'react',
                    description: 'A modern React project using Vite.',
                },
                {
                    name:'Backend (Node.js + Express)',
                    value: 'node-backend',
                    description: 'A clean Express.js API server template.',
                },
                {
                    name: 'Vanilla JS (HTML + CSS + JS)',
                    value: 'vanilla',
                    description: 'A simple static website layout.',
                }
            ]

        });


        const initGit = await confirm({
            message: 'Do you want to initialize a Git repository?',
            default: true,
        });

        console.log(chalk.gray('\n----------------------------------------'));
        console.log(chalk.blue('⚒ Creating your workspace...'));

        if (initGit) {
            try{
                execSync('git init', { stdio: 'ignore' });
                console.log(chalk.green('✓ Git repository initialized.'));
            } catch (gitError) {
                console.log(chalk.yellow('Could not initialize Git. Is git installed on your system?'));
            }
        }
        console.log(chalk.green('✓ Setup complete! Have fun coding!'));

    } catch (error) {
        if (error.name === 'ExitPromptError') {
            console.log(chalk.yellow('\n\n👋 Setup cancelled. See you next time!'));
        } else {
            console.error(chalk.red('\n❌ An error occurred:', error.message));
        }
    }
}
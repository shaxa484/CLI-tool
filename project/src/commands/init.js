import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { input, select, confirm } from '@inquirer/prompts';
import cliProgress from 'cli-progress';
import ora from 'ora';
function writeFile(filePath, content) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content.trim() + '\n');
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


    export default async function initCommand() {
        const targetDir = process.cwd();
        const defaultName = path.basename(targetDir);

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
                        name: 'Backend (Node.js + Express)',
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

            const gitHubUrl = await input({
                message: 'Enter your GitHub repository URL (optional, leave blank to skip):',
                validate: (value) => {
                    if (value && !value.startsWith('http') && !value.startsWith('git@')) {
                        return 'Please enter a valid GitHub URL or leave blank.';
                    }
                    return true;
                }
            });


            const initGit = await confirm({
                message: 'Do you want to initialize a Git repository?',
                default: true,
            });

            console.log(chalk.gray('\n----------------------------------------'));
            console.log();
            console.log(chalk.blue('⚒ Generating project files...\n'));
            const progressBar = new cliProgress.SingleBar({
            format: chalk.cyan('Progress |') + chalk.magenta('{bar}') + '| {percentage}% || {info}',
            barCompleteChar: '█',
            barIncompleteChar: '░',
            hideCursor: true
        }, cliProgress.Presets.shades_classic);

        progressBar.start(100, 0, { info: 'Preparing template...' });

        await delay(300);
        progressBar.update(20, { info: 'Creating structure...' });

            if (projectType === 'vanilla') {
                await delay(200);
                writeFile(path.join(targetDir, 'index.html'), `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome to ${projectName}</h1>
    <div id="app"></div>
    <script src="app.js"></script>
</body>
</html>`);
                progressBar.update(50, { info: 'Writing index.html...' });
                await delay(200);
                writeFile(path.join(targetDir, 'style.css'), `
body {
    font-family: sans-serif;
    background: #121212;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}`);
                progressBar.update(75, { info: 'Writing styles...' });
                await delay(200);
                writeFile(path.join(targetDir, 'app.js'), `
console.log("Welcome to ${projectName}!");
document.getElementById('app').innerText = "Vanilla JS Template initialized successfully!";`);

            } else if (projectType === 'node-backend') {
                await delay(200);
                writeFile(path.join(targetDir, 'package.json'), JSON.stringify({
                    name: projectName.toLowerCase().replace(/\s+/g, '-'),
                    version: '1.0.0',
                    type: 'module',
                    main: 'src/index.js',
                    scripts: { start: 'node src/index.js' },
                    dependencies: { express: '^4.19.2' }
                }, null, 2));
                progressBar.update(50, { info: 'Writing package.json...' });
                await delay(200);


                writeFile(path.join(targetDir, 'src/index.js'), `
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the ${projectName} API!" });
});

app.listen(PORT, () => {
    console.log(\`Server is running on http://localhost:\${PORT}\`);
});`);  
            progressBar.update(90, { info: 'Writing Express server code...' });

            } else if (projectType === 'react') {
                await delay(150);
                writeFile(path.join(targetDir, 'package.json'), JSON.stringify({
                    name: projectName.toLowerCase().replace(/\s+/g, '-'),
                    version: '1.0.0',
                    type: 'module',
                    scripts: { dev: 'vite' },
                    dependencies: { react: '^18.3.1', 'react-dom': '^18.3.1' },
                    devDependencies: { vite: '^5.3.1' }
                }, null, 2));
                progressBar.update(30, { info: 'Writing package.json...' });
                await delay(150);
                writeFile(path.join(targetDir, 'index.html'), `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`);
                progressBar.update(55, { info: 'Writing index.html...' });
                await delay(150);
                writeFile(path.join(targetDir, 'src/main.jsx'), `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`);
                progressBar.update(75, { info: 'Configuring main.jsx...' });
                await delay(150);
                writeFile(path.join(targetDir, 'src/App.jsx'), `
import React from 'react';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>React App: ${projectName}</h1>
    </div>
  );
}`);
                progressBar.update(90, { info: 'Configuring App.jsx...' });
            }

            await delay(200);
            writeFile(path.join(targetDir, 'README.md'), `
# ${projectName}

Bootstrapped using the custom \`project\` CLI tool.

## Setup
If your template has a \`package.json\`, run:
\`\`\`bash
npm install
\`\`\`
`);
            progressBar.update(100, { info: '\nFinished template generation!' });
            await delay(200);
            progressBar.stop();
            console.log(chalk.green('✓ Generated template files successfully.'));

            const spinner = ora({
            text: 'Setting up Git repository...',
            color: 'magenta'
            }).start();
            await delay(400);
            try {
                execSync('git init', { stdio: 'ignore' });
                console.log(chalk.green('✓ Initialized a local Git repository.'));
                await delay(300);
                if (gitHubUrl) {
                    execSync(`git remote add origin ${gitHubUrl}`, { stdio: 'ignore' });
                    console.log(chalk.green(`✓ Linked remote repository to origin: ${gitHubUrl}`));
                    await delay(300);
                    spinner.text = 'Creating initial commit...';
                    execSync('git branch -M main', { stdio: 'ignore' });
                    execSync('git add .', { stdio: 'ignore' });
                    execSync('git commit -m "Initial commit"', { stdio: 'ignore' });
                    await delay(300);
                }
                spinner.succeed(chalk.green('Git setup configured successfully!'));

                if (gitHubUrl) {
                console.log(chalk.magentaBright('\n💡 Pro tip: Run "git push -u origin main" to publish online!'));
            }
            } catch (gitError) {
                console.log(chalk.yellow('⚠ Git initialization failed. Make sure git is installed and configured on your machine.'));
            }




            
            console.log(chalk.green(`\n✓ Successfully setup "${projectName}"! Have fun coding!`));

        } catch (error) {
            if (error.name === 'ExitPromptError') {
                console.log(chalk.yellow('\n\n👋 Setup cancelled. See you next time!'));
            } else {
                console.error(chalk.red('\n❌ An error occurred:', error.message));
            }
        }
    }

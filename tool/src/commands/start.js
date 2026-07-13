import chalk from 'chalk';

module.export =function start() {
    console.log(chalkbgCyanBright('Starting the application...'));
    console.log(chalk.gray('Received configuration in start -', config));
}
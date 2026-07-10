#!/usr/bin/env node
import arg from 'arg';
import chalk from 'chalk';
import path from 'path';

try{
    
    const args=arg({
        '--start':Boolean,
        '--build':Boolean,
        '--help':Boolean,
    });

    if(args['--start']){
        const pkgPath = pkgUp.sync({cwd: process.cwd()});
        const pkg = require(pkgPath);
        if (pkg.tool) {
      console.log('Found configuration', pkg.tool);
      // TODO: do something with configuration
    } else {
      console.log(chalk.yellow('Could not find configuration, using default'));
      // TODO: get default configuration
    }
        console.log(chalk.green('Starting the application...'));
    }
    if(args['--build']){
        console.log(chalk.blue('Building the application...'));
    }
    if(args['--help']){
        usage();
    }

} catch (error) {
    console.log(chalk.yellow(('An error occurred:'), error.message));
    console.log();
    usage();
}
 function usage() {
    console.log(`${chalk.whiteBright('tool [CMD]')} 
    ${chalk.greenBright('--start  Start the application')}
    ${chalk.greenBright('--build  Build the application ')} 
    ${chalk.greenBright('--help   Show this help message\n')}`);
}
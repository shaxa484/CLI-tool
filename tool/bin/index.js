#!/usr/bin/env node
import arg from 'arg';
import chalk from 'chalk';
import path from 'path';
import getConfig from '../src/config/config-mgr.js'; 
import start from '../src/commands/start.js';
try{
    
    const args=arg({
        '--start':Boolean,
        '--build':Boolean,
        '--help':Boolean,
    });

    if(args['--start']){
       const config = getConfig();
       start(config);
      
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
#!/usr/bin/env node
try{
    const arg=require('arg');

    const args=arg({
        '--start':Boolean,
        '--build':Boolean,
    });

    if(args['--start']){
        console.log('Starting the application...');

}} catch (error) {
    console.log('An error occurred:', error.message);
    console.log();
    usage();
}
 function usage() {
    console.log('tool [CMD]');
    console.log('  --start   Start the application');
    console.log('  --build   Build the application');
}
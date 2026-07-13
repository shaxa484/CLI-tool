#!/usr/bin/env node
import {Command} from 'commander';
import initCommand from '../src/commands/init.js';
import chalk from 'chalk';

const program = new Command();

program
  .name('project')
  .description('CLI tool for project management')
  .version('1.0.0');
  
program
  .command('init')
  .description('Initialize a new project')
  .action(initCommand);

program.parse(process.argv);



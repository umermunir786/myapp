#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { createMyApp } from './index';

const program = new Command();

program
  .name('create-myapp')
  .description('CLI tool for creating and managing React Native/Expo apps with template automation')
  .version('1.0.0');

program
  .argument('[project-name]', 'Name of the project to create or update')
  .option('-t, --template <path>', 'Path to reference project template')
  .option('-c, --colors <path>', 'Path to new colors file')
  .option('-f, --fonts <path>', 'Path to new fonts file')
  .option('-s, --styles <path>', 'Path to new global styles file')
  .option('-a, --assets <path>', 'Path to new assets directory')
  .option('--components <path>', 'Path to new components directory')
  .option('--utilities <path>', 'Path to new utilities directory')
  .option('--services <path>', 'Path to new services directory')
  .option('--hooks <path>', 'Path to new hooks directory')
  .option('--interactive', 'Run in interactive mode')
  .action(async (projectName, options) => {
    try {
      await createMyApp(projectName, options);
    } catch (error) {
      console.error(chalk.red('❌ Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();

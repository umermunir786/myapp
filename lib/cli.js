#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const index_1 = require("./index");
const program = new commander_1.Command();
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
        await (0, index_1.createMyApp)(projectName, options);
    }
    catch (error) {
        console.error(chalk_1.default.red('❌ Error:'), error instanceof Error ? error.message : error);
        process.exit(1);
    }
});
program.parse();
//# sourceMappingURL=cli.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractivePrompts = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
class InteractivePrompts {
    static async getProjectSetup() {
        const answers = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'What is your project name?',
                validate: (input) => {
                    if (!input.trim()) {
                        return 'Project name is required';
                    }
                    if (!/^[a-z0-9-_]+$/.test(input)) {
                        return 'Project name must contain only lowercase letters, numbers, hyphens, and underscores';
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'colorsFile',
                message: 'Path to colors file (optional):',
                validate: (input) => {
                    if (input && !input.endsWith('.ts') && !input.endsWith('.js')) {
                        return 'Colors file must be a .ts or .js file';
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'fontsFile',
                message: 'Path to fonts file (optional):',
                validate: (input) => {
                    if (input && !input.endsWith('.ts') && !input.endsWith('.js')) {
                        return 'Fonts file must be a .ts or .js file';
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'assetsFolder',
                message: 'Path to assets folder (optional):'
            },
            {
                type: 'list',
                name: 'stateManagement',
                message: 'Choose state management library:',
                choices: [
                    { name: 'None', value: undefined },
                    { name: 'Redux Toolkit', value: 'redux' },
                    { name: 'Zustand', value: 'zustand' },
                    { name: 'MobX', value: 'mobx' }
                ]
            },
            {
                type: 'list',
                name: 'navigation',
                message: 'Choose navigation library:',
                choices: [
                    { name: 'None', value: undefined },
                    { name: 'React Navigation', value: 'react-navigation' },
                    { name: 'Expo Router', value: 'expo-router' }
                ]
            },
            {
                type: 'list',
                name: 'uiLibrary',
                message: 'Choose UI library:',
                choices: [
                    { name: 'None', value: undefined },
                    { name: 'NativeWind (Tailwind)', value: 'nativewind' },
                    { name: 'React Native Elements', value: 'react-native-elements' },
                    { name: 'UI Kitten', value: 'ui-kitten' }
                ]
            }
        ]);
        return answers;
    }
    static async confirmAction(message) {
        const { confirmed } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'confirmed',
                message,
                default: true
            }
        ]);
        return confirmed;
    }
    static async selectUpdateMode() {
        const { mode } = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'mode',
                message: 'What would you like to update?',
                choices: [
                    { name: 'Update specific files', value: 'single' },
                    { name: 'Update multiple components', value: 'multiple' },
                    { name: 'Update entire project structure', value: 'all' }
                ]
            }
        ]);
        return mode;
    }
    static async selectFilesToUpdate(availableFiles) {
        const { selectedFiles } = await inquirer_1.default.prompt([
            {
                type: 'checkbox',
                name: 'selectedFiles',
                message: 'Select files to update:',
                choices: availableFiles.map(file => ({
                    name: file,
                    value: file
                })),
                validate: (input) => {
                    if (input.length === 0) {
                        return 'Please select at least one file';
                    }
                    return true;
                }
            }
        ]);
        return selectedFiles;
    }
}
exports.InteractivePrompts = InteractivePrompts;
//# sourceMappingURL=interactive.js.map
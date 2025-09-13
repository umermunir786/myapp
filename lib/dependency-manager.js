"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyManager = void 0;
const execa_1 = __importDefault(require("execa"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
class DependencyManager {
    constructor(projectPath) {
        this.projectPath = projectPath;
    }
    async updateDependencies(oldDeps, newDeps) {
        const toInstall = this.getDependenciesToInstall(oldDeps, newDeps);
        const toUninstall = this.getDependenciesToUninstall(oldDeps, newDeps);
        if (toUninstall.length > 0) {
            await this.uninstallPackages(toUninstall);
        }
        if (toInstall.length > 0) {
            await this.installPackages(toInstall);
        }
    }
    getDependenciesToInstall(oldDeps, newDeps) {
        const toInstall = [];
        // State management
        if (newDeps.stateManagement && newDeps.stateManagement !== oldDeps.stateManagement) {
            const packages = this.getStateManagementPackages(newDeps.stateManagement);
            toInstall.push(...packages);
        }
        // Navigation
        if (newDeps.navigation && newDeps.navigation !== oldDeps.navigation) {
            const packages = this.getNavigationPackages(newDeps.navigation);
            toInstall.push(...packages);
        }
        // UI Library
        if (newDeps.uiLibrary && newDeps.uiLibrary !== oldDeps.uiLibrary) {
            const packages = this.getUILibraryPackages(newDeps.uiLibrary);
            toInstall.push(...packages);
        }
        return toInstall;
    }
    getDependenciesToUninstall(oldDeps, newDeps) {
        const toUninstall = [];
        // State management
        if (oldDeps.stateManagement && oldDeps.stateManagement !== newDeps.stateManagement) {
            const packages = this.getStateManagementPackages(oldDeps.stateManagement);
            toUninstall.push(...packages);
        }
        // Navigation
        if (oldDeps.navigation && oldDeps.navigation !== newDeps.navigation) {
            const packages = this.getNavigationPackages(oldDeps.navigation);
            toUninstall.push(...packages);
        }
        // UI Library
        if (oldDeps.uiLibrary && oldDeps.uiLibrary !== newDeps.uiLibrary) {
            const packages = this.getUILibraryPackages(oldDeps.uiLibrary);
            toUninstall.push(...packages);
        }
        return toUninstall;
    }
    getStateManagementPackages(type) {
        switch (type) {
            case 'zustand':
                return ['zustand'];
            case 'redux':
                return ['@reduxjs/toolkit', 'react-redux', 'redux-persist'];
            case 'mobx':
                return ['mobx', 'mobx-react-lite'];
            default:
                return [];
        }
    }
    getNavigationPackages(type) {
        switch (type) {
            case 'react-navigation':
                return ['@react-navigation/native', '@react-navigation/native-stack'];
            case 'expo-router':
                return ['expo-router'];
            default:
                return [];
        }
    }
    getUILibraryPackages(type) {
        switch (type) {
            case 'nativewind':
                return ['nativewind', 'tailwindcss'];
            case 'react-native-elements':
                return ['react-native-elements', 'react-native-vector-icons'];
            case 'ui-kitten':
                return ['@ui-kitten/components', '@eva-design/eva'];
            default:
                return [];
        }
    }
    getResponsivePackages() {
        return [
            'react-native-responsive-dimensions',
            'react-native-size-matters',
            'react-native-responsive-fontsize'
        ];
    }
    async ensureResponsivePackages() {
        console.log(chalk_1.default.blue('📱 Ensuring responsive packages are installed...'));
        try {
            const packageJsonPath = path_1.default.join(this.projectPath, 'package.json');
            if (await fs_extra_1.default.pathExists(packageJsonPath)) {
                const packageJson = await fs_extra_1.default.readJson(packageJsonPath);
                const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
                const responsivePackages = this.getResponsivePackages();
                const missingPackages = responsivePackages.filter(pkg => !allDeps[pkg]);
                if (missingPackages.length > 0) {
                    await this.installPackages(missingPackages);
                }
                else {
                    console.log(chalk_1.default.green('✅ Responsive packages already installed'));
                }
            }
        }
        catch (error) {
            console.warn(chalk_1.default.yellow('⚠️  Warning: Could not check responsive packages'));
        }
    }
    async setupHuskyAndFormatting() {
        console.log(chalk_1.default.blue('🐕 Setting up Husky and code formatting...'));
        try {
            const packageJsonPath = path_1.default.join(this.projectPath, 'package.json');
            if (await fs_extra_1.default.pathExists(packageJsonPath)) {
                const packageJson = await fs_extra_1.default.readJson(packageJsonPath);
                const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
                // Install formatting packages if not present
                const formattingPackages = ['husky', 'prettier', 'lint-staged'];
                const missingPackages = formattingPackages.filter(pkg => !allDeps[pkg]);
                if (missingPackages.length > 0) {
                    await this.installPackages(missingPackages);
                }
                // Setup Husky
                await this.initializeHusky();
                // Add package.json scripts
                await this.addFormattingScripts();
                console.log(chalk_1.default.green('✅ Husky and formatting tools configured'));
            }
        }
        catch (error) {
            console.warn(chalk_1.default.yellow('⚠️  Warning: Could not setup Husky'));
        }
    }
    async initializeHusky() {
        try {
            // Initialize Husky
            await (0, execa_1.default)('npx', ['husky', 'init'], {
                cwd: this.projectPath,
                stdio: 'pipe'
            });
            console.log(chalk_1.default.blue('🔧 Initialized Husky'));
        }
        catch (error) {
            console.warn('Warning: Could not initialize Husky automatically');
        }
    }
    async addFormattingScripts() {
        try {
            const packageJsonPath = path_1.default.join(this.projectPath, 'package.json');
            const packageJson = await fs_extra_1.default.readJson(packageJsonPath);
            // Add professional scripts
            packageJson.scripts = {
                ...packageJson.scripts,
                "format": "prettier --write .",
                "format:check": "prettier --check .",
                "lint:fix": "eslint . --fix",
                "lint:check": "eslint .",
                "prepare": "husky"
            };
            // Add lint-staged configuration
            packageJson["lint-staged"] = {
                "*.{js,jsx,ts,tsx}": [
                    "eslint --fix",
                    "prettier --write"
                ],
                "*.{json,md,yml,yaml}": [
                    "prettier --write"
                ]
            };
            await fs_extra_1.default.writeJson(packageJsonPath, packageJson, { spaces: 2 });
            console.log(chalk_1.default.blue('📝 Added formatting scripts to package.json'));
        }
        catch (error) {
            console.warn('Warning: Could not update package.json scripts');
        }
    }
    async installPackages(packages) {
        console.log(chalk_1.default.blue(`📦 Installing packages: ${packages.join(', ')}`));
        try {
            const packageManager = await this.detectPackageManager();
            const installCommand = packageManager === 'yarn' ? 'add' : 'install';
            await (0, execa_1.default)(packageManager, [installCommand, ...packages], {
                cwd: this.projectPath,
                stdio: 'inherit'
            });
            console.log(chalk_1.default.green(`✅ Successfully installed: ${packages.join(', ')}`));
        }
        catch (error) {
            console.error(chalk_1.default.red(`❌ Failed to install packages:`), error);
            throw error;
        }
    }
    async uninstallPackages(packages) {
        console.log(chalk_1.default.blue(`🗑️  Uninstalling packages: ${packages.join(', ')}`));
        try {
            const packageManager = await this.detectPackageManager();
            const uninstallCommand = packageManager === 'yarn' ? 'remove' : 'uninstall';
            await (0, execa_1.default)(packageManager, [uninstallCommand, ...packages], {
                cwd: this.projectPath,
                stdio: 'inherit'
            });
            console.log(chalk_1.default.green(`✅ Successfully uninstalled: ${packages.join(', ')}`));
        }
        catch (error) {
            console.error(chalk_1.default.red(`❌ Failed to uninstall packages:`), error);
            throw error;
        }
    }
    async detectPackageManager() {
        const yarnLockPath = path_1.default.join(this.projectPath, 'yarn.lock');
        const pnpmLockPath = path_1.default.join(this.projectPath, 'pnpm-lock.yaml');
        if (await fs_extra_1.default.pathExists(yarnLockPath)) {
            return 'yarn';
        }
        if (await fs_extra_1.default.pathExists(pnpmLockPath)) {
            return 'pnpm';
        }
        return 'npm';
    }
    async installDependencies() {
        console.log(chalk_1.default.blue('📦 Installing project dependencies...'));
        try {
            const packageManager = await this.detectPackageManager();
            await (0, execa_1.default)(packageManager, ['install'], {
                cwd: this.projectPath,
                stdio: 'inherit'
            });
            console.log(chalk_1.default.green('✅ Dependencies installed successfully'));
        }
        catch (error) {
            console.error(chalk_1.default.red('❌ Failed to install dependencies:'), error);
            throw error;
        }
    }
}
exports.DependencyManager = DependencyManager;
//# sourceMappingURL=dependency-manager.js.map
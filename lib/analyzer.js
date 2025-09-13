"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectAnalyzer = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
class ProjectAnalyzer {
    constructor(projectPath) {
        this.projectPath = projectPath;
    }
    async analyze() {
        const analysis = {
            components: [],
            utilities: [],
            services: [],
            hooks: [],
            workflows: [],
            dependencies: {},
            packageJson: {}
        };
        try {
            // Read package.json
            const packageJsonPath = path_1.default.join(this.projectPath, 'package.json');
            if (await fs_extra_1.default.pathExists(packageJsonPath)) {
                analysis.packageJson = await fs_extra_1.default.readJson(packageJsonPath);
                this.analyzeDependencies(analysis);
            }
            // Find colors file
            analysis.colorsFile = await this.findFile(['colors.ts', 'colors.js', 'constants/colors.ts', 'constants/colors.js', 'theme/colors.ts', 'theme/colors.js']);
            // Find fonts file
            analysis.fontsFile = await this.findFile(['fonts.ts', 'fonts.js', 'constants/fonts.ts', 'constants/fonts.js', 'theme/fonts.ts', 'theme/fonts.js']);
            // Find styles files
            analysis.stylesFile = await this.findFile(['styles.ts', 'styles.js', 'constants/styles.ts', 'constants/styles.js', 'theme/styles.ts', 'theme/styles.js']);
            analysis.globalStylesFile = await this.findFile(['globalStyles.ts', 'globalStyles.js', 'constants/globalStyles.ts', 'constants/globalStyles.js', 'styles/global.ts', 'styles/global.js', 'theme/global.ts', 'theme/global.js']);
            // Find assets directory
            analysis.assetsDir = await this.findDirectory(['assets', 'src/assets', 'app/assets']);
            // Find components directory
            analysis.componentsDir = await this.findDirectory(['components', 'src/components', 'app/components']);
            // Find utilities directory
            analysis.utilitiesDir = await this.findDirectory(['utils', 'utilities', 'src/utils', 'src/utilities', 'app/utils']);
            // Find services directory  
            analysis.servicesDir = await this.findDirectory(['services', 'src/services', 'app/services']);
            // Find hooks directory
            analysis.hooksDir = await this.findDirectory(['hooks', 'src/hooks', 'app/hooks']);
            // Find network directory (Elloo-specific)
            analysis.networkDir = await this.findDirectory(['network', 'src/network', 'app/network']);
            // Find store directory (Elloo-specific)
            analysis.storeDir = await this.findDirectory(['store', 'src/store', 'app/store']);
            // Find GitHub workflows directory
            analysis.workflowsDir = await this.findDirectory(['.github/workflows']);
            // Find Husky directory
            analysis.huskyDir = await this.findDirectory(['.husky']);
            // Find components
            if (analysis.componentsDir) {
                analysis.components = await this.findComponents(analysis.componentsDir);
            }
            // Find utilities
            if (analysis.utilitiesDir) {
                analysis.utilities = await this.findFilesList(analysis.utilitiesDir);
            }
            // Find services
            if (analysis.servicesDir) {
                analysis.services = await this.findFilesList(analysis.servicesDir);
            }
            // Find hooks
            if (analysis.hooksDir) {
                analysis.hooks = await this.findFilesList(analysis.hooksDir);
            }
            // Find workflows
            if (analysis.workflowsDir) {
                analysis.workflows = await this.findWorkflowFiles(analysis.workflowsDir);
            }
        }
        catch (error) {
            console.warn('Warning: Error during analysis:', error);
        }
        return analysis;
    }
    async findFile(possiblePaths) {
        for (const relativePath of possiblePaths) {
            const fullPath = path_1.default.join(this.projectPath, relativePath);
            if (await fs_extra_1.default.pathExists(fullPath)) {
                return relativePath;
            }
        }
        return undefined;
    }
    async findDirectory(possiblePaths) {
        for (const relativePath of possiblePaths) {
            const fullPath = path_1.default.join(this.projectPath, relativePath);
            if (await fs_extra_1.default.pathExists(fullPath) && (await fs_extra_1.default.stat(fullPath)).isDirectory()) {
                return relativePath;
            }
        }
        return undefined;
    }
    async findComponents(componentsDir) {
        const components = [];
        const componentsPath = path_1.default.join(this.projectPath, componentsDir);
        try {
            const files = await fs_extra_1.default.readdir(componentsPath, { withFileTypes: true });
            for (const file of files) {
                if (file.isFile() && (file.name.endsWith('.tsx') || file.name.endsWith('.ts') || file.name.endsWith('.jsx') || file.name.endsWith('.js'))) {
                    const componentName = path_1.default.parse(file.name).name;
                    if (componentName.charAt(0) === componentName.charAt(0).toUpperCase()) {
                        components.push(componentName);
                    }
                }
                else if (file.isDirectory()) {
                    // Check for index file in subdirectory
                    const subDir = path_1.default.join(componentsPath, file.name);
                    const indexFiles = ['index.tsx', 'index.ts', 'index.jsx', 'index.js'];
                    for (const indexFile of indexFiles) {
                        if (await fs_extra_1.default.pathExists(path_1.default.join(subDir, indexFile))) {
                            const componentName = file.name;
                            if (componentName.charAt(0) === componentName.charAt(0).toUpperCase()) {
                                components.push(componentName);
                            }
                            break;
                        }
                    }
                }
            }
        }
        catch (error) {
            console.warn('Warning: Could not analyze components directory:', error);
        }
        return components;
    }
    async findFilesList(dirPath) {
        const files = [];
        const fullPath = path_1.default.join(this.projectPath, dirPath);
        try {
            const entries = await fs_extra_1.default.readdir(fullPath, { withFileTypes: true });
            for (const entry of entries) {
                if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
                    const fileName = path_1.default.parse(entry.name).name;
                    files.push(fileName);
                }
                else if (entry.isDirectory()) {
                    // Check for index file in subdirectory
                    const subDir = path_1.default.join(fullPath, entry.name);
                    const indexFiles = ['index.tsx', 'index.ts', 'index.jsx', 'index.js'];
                    for (const indexFile of indexFiles) {
                        if (await fs_extra_1.default.pathExists(path_1.default.join(subDir, indexFile))) {
                            files.push(entry.name);
                            break;
                        }
                    }
                }
            }
        }
        catch (error) {
            console.warn(`Warning: Could not analyze directory ${dirPath}:`, error);
        }
        return files;
    }
    async findWorkflowFiles(workflowsDir) {
        const workflows = [];
        const workflowsPath = path_1.default.join(this.projectPath, workflowsDir);
        try {
            const files = await fs_extra_1.default.readdir(workflowsPath, { withFileTypes: true });
            for (const file of files) {
                if (file.isFile() && (file.name.endsWith('.yml') || file.name.endsWith('.yaml'))) {
                    const workflowName = path_1.default.parse(file.name).name;
                    workflows.push(workflowName);
                }
            }
        }
        catch (error) {
            console.warn(`Warning: Could not analyze workflows directory ${workflowsDir}:`, error);
        }
        return workflows;
    }
    analyzeDependencies(analysis) {
        const allDeps = {
            ...analysis.packageJson.dependencies,
            ...analysis.packageJson.devDependencies
        };
        // State Management (check Zustand first as it's preferred)
        if (allDeps['zustand']) {
            analysis.dependencies.stateManagement = 'zustand';
        }
        else if (allDeps['@reduxjs/toolkit'] || allDeps['redux']) {
            analysis.dependencies.stateManagement = 'redux';
        }
        else if (allDeps['mobx'] || allDeps['mobx-react-lite']) {
            analysis.dependencies.stateManagement = 'mobx';
        }
        // Navigation
        if (allDeps['@react-navigation/native']) {
            analysis.dependencies.navigation = 'react-navigation';
        }
        else if (allDeps['expo-router']) {
            analysis.dependencies.navigation = 'expo-router';
        }
        // UI Library
        if (allDeps['nativewind'] || allDeps['tailwindcss']) {
            analysis.dependencies.uiLibrary = 'nativewind';
        }
        else if (allDeps['react-native-elements']) {
            analysis.dependencies.uiLibrary = 'react-native-elements';
        }
        else if (allDeps['@ui-kitten/components']) {
            analysis.dependencies.uiLibrary = 'ui-kitten';
        }
        // Responsive Libraries (automatically included in Elloo/MyBrandApp)
        if (allDeps['react-native-responsive-dimensions'] || allDeps['react-native-size-matters']) {
            analysis.dependencies.responsive = 'included';
        }
        // Code quality tools
        analysis.dependencies.husky = !!allDeps['husky'];
        analysis.dependencies.prettier = !!allDeps['prettier'];
        analysis.dependencies.eslint = !!(allDeps['eslint'] || allDeps['@typescript-eslint/parser']);
    }
}
exports.ProjectAnalyzer = ProjectAnalyzer;
//# sourceMappingURL=analyzer.js.map
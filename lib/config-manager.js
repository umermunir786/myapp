"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
class ConfigManager {
    static async saveConfig(projectPath, analysis) {
        const config = {
            colorsFile: analysis.colorsFile || '',
            fontsFile: analysis.fontsFile || '',
            stylesFile: analysis.stylesFile,
            globalStylesFile: analysis.globalStylesFile,
            assetsDir: analysis.assetsDir || '',
            componentsDir: analysis.componentsDir || '',
            utilitiesDir: analysis.utilitiesDir,
            servicesDir: analysis.servicesDir,
            hooksDir: analysis.hooksDir,
            networkDir: analysis.networkDir,
            storeDir: analysis.storeDir,
            workflowsDir: analysis.workflowsDir,
            dependencies: analysis.dependencies,
            projectStructure: {
                colors: analysis.colorsFile || '',
                fonts: analysis.fontsFile || '',
                styles: analysis.stylesFile || '',
                globalStyles: analysis.globalStylesFile || '',
                assets: analysis.assetsDir || '',
                components: analysis.componentsDir || '',
                utilities: analysis.utilitiesDir || '',
                services: analysis.servicesDir || '',
                hooks: analysis.hooksDir || '',
                network: analysis.networkDir || '',
                store: analysis.storeDir || '',
                workflows: analysis.workflowsDir || ''
            },
            components: analysis.components,
            utilities: analysis.utilities,
            services: analysis.services,
            hooks: analysis.hooks,
            workflows: analysis.workflows
        };
        const configPath = path_1.default.join(projectPath, '.myappconfig.json');
        await fs_extra_1.default.writeJson(configPath, config, { spaces: 2 });
        return config;
    }
    static async loadConfig(projectPath) {
        const configPath = path_1.default.join(projectPath, '.myappconfig.json');
        if (await fs_extra_1.default.pathExists(configPath)) {
            try {
                return await fs_extra_1.default.readJson(configPath);
            }
            catch (error) {
                console.warn('Warning: Could not read .myappconfig.json');
                return null;
            }
        }
        return null;
    }
    static async updateConfig(projectPath, updates) {
        const existingConfig = await this.loadConfig(projectPath) || this.getDefaultConfig();
        const updatedConfig = { ...existingConfig, ...updates };
        const configPath = path_1.default.join(projectPath, '.myappconfig.json');
        await fs_extra_1.default.writeJson(configPath, updatedConfig, { spaces: 2 });
        return updatedConfig;
    }
    static getDefaultConfig() {
        return {
            colorsFile: '',
            fontsFile: '',
            stylesFile: '',
            globalStylesFile: '',
            assetsDir: '',
            componentsDir: '',
            utilitiesDir: '',
            servicesDir: '',
            hooksDir: '',
            networkDir: '',
            storeDir: '',
            workflowsDir: '',
            dependencies: {},
            projectStructure: {},
            components: [],
            utilities: [],
            services: [],
            hooks: [],
            workflows: []
        };
    }
    static async findProjectRoot(startPath = process.cwd()) {
        let currentPath = path_1.default.resolve(startPath);
        while (currentPath !== path_1.default.dirname(currentPath)) {
            const configPath = path_1.default.join(currentPath, '.myappconfig.json');
            const packageJsonPath = path_1.default.join(currentPath, 'package.json');
            if (await fs_extra_1.default.pathExists(configPath) || await fs_extra_1.default.pathExists(packageJsonPath)) {
                return currentPath;
            }
            currentPath = path_1.default.dirname(currentPath);
        }
        return null;
    }
}
exports.ConfigManager = ConfigManager;
//# sourceMappingURL=config-manager.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMyApp = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const analyzer_1 = require("./analyzer");
const file_operations_1 = require("./file-operations");
const config_manager_1 = require("./config-manager");
const dependency_manager_1 = require("./dependency-manager");
const interactive_1 = require("./interactive");
async function createMyApp(projectName, options = {}) {
    console.log(chalk_1.default.cyan('🚀 Welcome to create-myapp!'));
    try {
        // Handle interactive mode or missing project name
        if (options.interactive || !projectName) {
            if (!projectName) {
                const answers = await interactive_1.InteractivePrompts.getProjectSetup();
                projectName = answers.projectName;
                // Convert interactive answers to CLI options
                if (answers.colorsFile)
                    options.colors = answers.colorsFile;
                if (answers.fontsFile)
                    options.fonts = answers.fontsFile;
                if (answers.assetsFolder)
                    options.assets = answers.assetsFolder;
            }
        }
        if (!projectName) {
            throw new Error('Project name is required');
        }
        const targetPath = path_1.default.resolve(process.cwd(), projectName);
        // Check if this is a first-time template setup or an update operation
        if (options.template) {
            await handleTemplateMode(projectName, targetPath, options);
        }
        else {
            await handleUpdateMode(projectName, targetPath, options);
        }
        console.log(chalk_1.default.green('\n✅ Project updated successfully!'));
        console.log(chalk_1.default.cyan(`📁 cd ${projectName} && yarn start`));
    }
    catch (error) {
        console.error(chalk_1.default.red('❌ Error:'), error instanceof Error ? error.message : error);
        throw error;
    }
}
exports.createMyApp = createMyApp;
async function handleTemplateMode(projectName, targetPath, options) {
    console.log(chalk_1.default.blue('📋 Setting up project from template...'));
    if (!options.template) {
        throw new Error('Template path is required for template mode');
    }
    const templatePath = path_1.default.resolve(options.template);
    // Copy template to target directory
    await file_operations_1.FileOperations.copyTemplate(templatePath, targetPath, projectName);
    // Analyze the copied project
    console.log(chalk_1.default.blue('🔍 Analyzing project structure...'));
    const analyzer = new analyzer_1.ProjectAnalyzer(targetPath);
    const analysis = await analyzer.analyze();
    // Save configuration
    const config = await config_manager_1.ConfigManager.saveConfig(targetPath, analysis);
    console.log(chalk_1.default.green(`💾 Configuration saved to ${projectName}/.myappconfig.json`));
    // Install dependencies
    const depManager = new dependency_manager_1.DependencyManager(targetPath);
    await depManager.installDependencies();
    // Ensure responsive packages are available (for font scaling)
    await depManager.ensureResponsivePackages();
    // Setup Husky and code formatting
    await depManager.setupHuskyAndFormatting();
    // Show analysis summary
    showAnalysisSummary(config);
}
async function handleUpdateMode(projectName, targetPath, options) {
    console.log(chalk_1.default.blue('🔄 Updating existing project...'));
    // Check if project exists
    if (!await fs_extra_1.default.pathExists(targetPath)) {
        throw new Error(`Project directory does not exist: ${targetPath}`);
    }
    // Load existing configuration
    const config = await config_manager_1.ConfigManager.loadConfig(targetPath);
    if (!config) {
        throw new Error(`No .myappconfig.json found in ${projectName}. Run with --template first.`);
    }
    const updatedFiles = [];
    // Update colors file
    if (options.colors && config.colorsFile) {
        await file_operations_1.FileOperations.replaceFile(options.colors, targetPath, config.colorsFile);
        updatedFiles.push('colors');
    }
    // Update fonts file
    if (options.fonts && config.fontsFile) {
        await file_operations_1.FileOperations.replaceFile(options.fonts, targetPath, config.fontsFile);
        updatedFiles.push('fonts');
    }
    // Update styles file (create if doesn't exist)
    if (options.styles) {
        const stylesPath = config.stylesFile || config.globalStylesFile || 'constants/styles.js';
        await file_operations_1.FileOperations.replaceFile(options.styles, targetPath, stylesPath);
        if (!config.stylesFile && !config.globalStylesFile) {
            // Update config to include new styles file
            config.stylesFile = stylesPath;
            await config_manager_1.ConfigManager.updateConfig(targetPath, { stylesFile: stylesPath });
            console.log(chalk_1.default.blue(`📝 Added new styles file: ${stylesPath}`));
        }
        updatedFiles.push('styles');
    }
    // Update assets directory
    if (options.assets && config.assetsDir) {
        await file_operations_1.FileOperations.replaceDirectory(options.assets, targetPath, config.assetsDir);
        await file_operations_1.FileOperations.updateAppConfig(targetPath, options.assets);
        updatedFiles.push('assets');
    }
    // Update components directory
    if (options.components && config.componentsDir) {
        await file_operations_1.FileOperations.replaceDirectory(options.components, targetPath, config.componentsDir);
        updatedFiles.push('components');
    }
    // Update utilities directory (create if doesn't exist)
    if (options.utilities) {
        const utilitiesPath = config.utilitiesDir || 'utils';
        await file_operations_1.FileOperations.replaceDirectory(options.utilities, targetPath, utilitiesPath);
        if (!config.utilitiesDir) {
            // Update config to include new utilities directory
            config.utilitiesDir = utilitiesPath;
            await config_manager_1.ConfigManager.updateConfig(targetPath, { utilitiesDir: utilitiesPath });
            console.log(chalk_1.default.blue(`📝 Added new utilities directory: ${utilitiesPath}`));
        }
        updatedFiles.push('utilities');
    }
    // Update services directory
    if (options.services && config.servicesDir) {
        await file_operations_1.FileOperations.replaceDirectory(options.services, targetPath, config.servicesDir);
        updatedFiles.push('services');
    }
    // Update hooks directory (create if doesn't exist)
    if (options.hooks) {
        const hooksPath = config.hooksDir || 'hooks';
        await file_operations_1.FileOperations.replaceDirectory(options.hooks, targetPath, hooksPath);
        if (!config.hooksDir) {
            // Update config to include new hooks directory
            config.hooksDir = hooksPath;
            await config_manager_1.ConfigManager.updateConfig(targetPath, { hooksDir: hooksPath });
            console.log(chalk_1.default.blue(`📝 Added new hooks directory: ${hooksPath}`));
        }
        updatedFiles.push('hooks');
    }
    // Update imports if needed
    if (updatedFiles.length > 0) {
        console.log(chalk_1.default.blue('🔗 Updating imports and references...'));
        for (const fileType of updatedFiles) {
            if (fileType === 'colors' && config.colorsFile) {
                await file_operations_1.FileOperations.updateImports(targetPath, config.colorsFile, config.colorsFile);
            }
            else if (fileType === 'fonts' && config.fontsFile) {
                await file_operations_1.FileOperations.updateImports(targetPath, config.fontsFile, config.fontsFile);
            }
            else if (fileType === 'styles' && (config.stylesFile || config.globalStylesFile)) {
                const stylesPath = config.stylesFile || config.globalStylesFile;
                await file_operations_1.FileOperations.updateImports(targetPath, stylesPath, stylesPath);
            }
        }
    }
    // Show summary of updates
    if (updatedFiles.length > 0) {
        console.log(chalk_1.default.green(`\n📝 Updated components: ${updatedFiles.join(', ')}`));
    }
    else {
        console.log(chalk_1.default.yellow('⚠️  No files were updated. Please specify --colors, --fonts, or --assets.'));
    }
}
function showAnalysisSummary(config) {
    console.log(chalk_1.default.cyan('\n📊 Project Analysis Summary:'));
    if (config.colorsFile) {
        console.log(chalk_1.default.green(`  🎨 Colors: ${config.colorsFile}`));
    }
    if (config.fontsFile) {
        console.log(chalk_1.default.green(`  📝 Fonts: ${config.fontsFile}`));
    }
    if (config.stylesFile || config.globalStylesFile) {
        console.log(chalk_1.default.green(`  🎨 Styles: ${config.stylesFile || config.globalStylesFile}`));
    }
    if (config.assetsDir) {
        console.log(chalk_1.default.green(`  📁 Assets: ${config.assetsDir}`));
    }
    if (config.componentsDir) {
        console.log(chalk_1.default.green(`  🧩 Components: ${config.componentsDir}`));
    }
    if (config.utilitiesDir) {
        console.log(chalk_1.default.green(`  🛠️  Utilities: ${config.utilitiesDir}`));
    }
    if (config.servicesDir) {
        console.log(chalk_1.default.green(`  ⚙️  Services: ${config.servicesDir}`));
    }
    if (config.hooksDir) {
        console.log(chalk_1.default.green(`  🪝 Hooks: ${config.hooksDir}`));
    }
    if (config.networkDir) {
        console.log(chalk_1.default.green(`  🌐 Network: ${config.networkDir}`));
    }
    if (config.storeDir) {
        console.log(chalk_1.default.green(`  💾 Store: ${config.storeDir}`));
    }
    if (config.workflowsDir) {
        console.log(chalk_1.default.green(`  🔄 CI/CD: ${config.workflowsDir}`));
    }
    if (config.components.length > 0) {
        console.log(chalk_1.default.green(`  📦 Found ${config.components.length} components: ${config.components.slice(0, 5).join(', ')}${config.components.length > 5 ? '...' : ''}`));
    }
    if (config.utilities.length > 0) {
        console.log(chalk_1.default.green(`  🔧 Found ${config.utilities.length} utilities: ${config.utilities.slice(0, 3).join(', ')}${config.utilities.length > 3 ? '...' : ''}`));
    }
    if (config.services.length > 0) {
        console.log(chalk_1.default.green(`  🔄 Found ${config.services.length} services: ${config.services.slice(0, 3).join(', ')}${config.services.length > 3 ? '...' : ''}`));
    }
    if (config.hooks.length > 0) {
        console.log(chalk_1.default.green(`  ⚡ Found ${config.hooks.length} hooks: ${config.hooks.slice(0, 3).join(', ')}${config.hooks.length > 3 ? '...' : ''}`));
    }
    if (config.workflows.length > 0) {
        console.log(chalk_1.default.green(`  🚀 Found ${config.workflows.length} workflows: ${config.workflows.join(', ')}`));
    }
    const deps = config.dependencies;
    if (deps.stateManagement || deps.navigation || deps.uiLibrary) {
        console.log(chalk_1.default.cyan('  🔧 Dependencies:'));
        if (deps.stateManagement)
            console.log(chalk_1.default.blue(`    State: ${deps.stateManagement}`));
        if (deps.navigation)
            console.log(chalk_1.default.blue(`    Navigation: ${deps.navigation}`));
        if (deps.uiLibrary)
            console.log(chalk_1.default.blue(`    UI: ${deps.uiLibrary}`));
    }
    if (deps.husky || deps.prettier || deps.eslint) {
        console.log(chalk_1.default.cyan('  ⚙️  Code Quality:'));
        if (deps.husky)
            console.log(chalk_1.default.blue(`    Husky: ✅ Git hooks`));
        if (deps.prettier)
            console.log(chalk_1.default.blue(`    Prettier: ✅ Code formatting`));
        if (deps.eslint)
            console.log(chalk_1.default.blue(`    ESLint: ✅ Code linting`));
    }
}
//# sourceMappingURL=index.js.map
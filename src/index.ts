import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { ProjectAnalyzer } from './analyzer';
import { FileOperations } from './file-operations';
import { ConfigManager } from './config-manager';
import { DependencyManager } from './dependency-manager';
import { InteractivePrompts } from './interactive';
import { CLIOptions, MyAppConfig } from './types';

export async function createMyApp(projectName?: string, options: CLIOptions = {}): Promise<void> {
  console.log(chalk.cyan('🚀 Welcome to create-myapp!'));

  try {
    // Handle interactive mode or missing project name
    if (options.interactive || !projectName) {
      if (!projectName) {
        const answers = await InteractivePrompts.getProjectSetup();
        projectName = answers.projectName;
        
        // Convert interactive answers to CLI options
        if (answers.colorsFile) options.colors = answers.colorsFile;
        if (answers.fontsFile) options.fonts = answers.fontsFile;
        if (answers.assetsFolder) options.assets = answers.assetsFolder;
      }
    }

    if (!projectName) {
      throw new Error('Project name is required');
    }

    const targetPath = path.resolve(process.cwd(), projectName);

    // Check if this is a first-time template setup or an update operation
    if (options.template) {
      await handleTemplateMode(projectName, targetPath, options);
    } else {
      await handleUpdateMode(projectName, targetPath, options);
    }

    console.log(chalk.green('\n✅ Project updated successfully!'));
    console.log(chalk.cyan(`📁 cd ${projectName} && yarn start`));

  } catch (error) {
    console.error(chalk.red('❌ Error:'), error instanceof Error ? error.message : error);
    throw error;
  }
}

async function handleTemplateMode(projectName: string, targetPath: string, options: CLIOptions): Promise<void> {
  console.log(chalk.blue('📋 Setting up project from template...'));

  if (!options.template) {
    throw new Error('Template path is required for template mode');
  }

  const templatePath = path.resolve(options.template);

  // Copy template to target directory
  await FileOperations.copyTemplate(templatePath, targetPath, projectName);

  // Analyze the copied project
  console.log(chalk.blue('🔍 Analyzing project structure...'));
  const analyzer = new ProjectAnalyzer(targetPath);
  const analysis = await analyzer.analyze();

  // Save configuration
  const config = await ConfigManager.saveConfig(targetPath, analysis);
  console.log(chalk.green(`💾 Configuration saved to ${projectName}/.myappconfig.json`));

  // Install dependencies
  const depManager = new DependencyManager(targetPath);
  await depManager.installDependencies();
  
  // Ensure responsive packages are available (for font scaling)
  await depManager.ensureResponsivePackages();
  
  // Setup Husky and code formatting
  await depManager.setupHuskyAndFormatting();

  // Show analysis summary
  showAnalysisSummary(config);
}

async function handleUpdateMode(projectName: string, targetPath: string, options: CLIOptions): Promise<void> {
  console.log(chalk.blue('🔄 Updating existing project...'));

  // Check if project exists
  if (!await fs.pathExists(targetPath)) {
    throw new Error(`Project directory does not exist: ${targetPath}`);
  }

  // Load existing configuration
  const config = await ConfigManager.loadConfig(targetPath);
  if (!config) {
    throw new Error(`No .myappconfig.json found in ${projectName}. Run with --template first.`);
  }

  const updatedFiles: string[] = [];

  // Update colors file
  if (options.colors && config.colorsFile) {
    await FileOperations.replaceFile(options.colors, targetPath, config.colorsFile);
    updatedFiles.push('colors');
  }

  // Update fonts file
  if (options.fonts && config.fontsFile) {
    await FileOperations.replaceFile(options.fonts, targetPath, config.fontsFile);
    updatedFiles.push('fonts');
  }

  // Update styles file (create if doesn't exist)
  if (options.styles) {
    const stylesPath = config.stylesFile || config.globalStylesFile || 'constants/styles.js';
    await FileOperations.replaceFile(options.styles, targetPath, stylesPath);
    if (!config.stylesFile && !config.globalStylesFile) {
      // Update config to include new styles file
      config.stylesFile = stylesPath;
      await ConfigManager.updateConfig(targetPath, { stylesFile: stylesPath });
      console.log(chalk.blue(`📝 Added new styles file: ${stylesPath}`));
    }
    updatedFiles.push('styles');
  }

  // Update assets directory
  if (options.assets && config.assetsDir) {
    await FileOperations.replaceDirectory(options.assets, targetPath, config.assetsDir);
    await FileOperations.updateAppConfig(targetPath, options.assets);
    updatedFiles.push('assets');
  }

  // Update components directory
  if (options.components && config.componentsDir) {
    await FileOperations.replaceDirectory(options.components, targetPath, config.componentsDir);
    updatedFiles.push('components');
  }

  // Update utilities directory (create if doesn't exist)
  if (options.utilities) {
    const utilitiesPath = config.utilitiesDir || 'utils';
    await FileOperations.replaceDirectory(options.utilities, targetPath, utilitiesPath);
    if (!config.utilitiesDir) {
      // Update config to include new utilities directory
      config.utilitiesDir = utilitiesPath;
      await ConfigManager.updateConfig(targetPath, { utilitiesDir: utilitiesPath });
      console.log(chalk.blue(`📝 Added new utilities directory: ${utilitiesPath}`));
    }
    updatedFiles.push('utilities');
  }

  // Update services directory
  if (options.services && config.servicesDir) {
    await FileOperations.replaceDirectory(options.services, targetPath, config.servicesDir);
    updatedFiles.push('services');
  }

  // Update hooks directory (create if doesn't exist)
  if (options.hooks) {
    const hooksPath = config.hooksDir || 'hooks';
    await FileOperations.replaceDirectory(options.hooks, targetPath, hooksPath);
    if (!config.hooksDir) {
      // Update config to include new hooks directory
      config.hooksDir = hooksPath;
      await ConfigManager.updateConfig(targetPath, { hooksDir: hooksPath });
      console.log(chalk.blue(`📝 Added new hooks directory: ${hooksPath}`));
    }
    updatedFiles.push('hooks');
  }

  // Update imports if needed
  if (updatedFiles.length > 0) {
    console.log(chalk.blue('🔗 Updating imports and references...'));
    
    for (const fileType of updatedFiles) {
      if (fileType === 'colors' && config.colorsFile) {
      await FileOperations.updateImports(targetPath, config.colorsFile, config.colorsFile);
      } else if (fileType === 'fonts' && config.fontsFile) {
      await FileOperations.updateImports(targetPath, config.fontsFile, config.fontsFile);
      } else if (fileType === 'styles' && (config.stylesFile || config.globalStylesFile)) {
        const stylesPath = config.stylesFile || config.globalStylesFile;
        await FileOperations.updateImports(targetPath, stylesPath!, stylesPath!);
      }
    }
  }

  // Show summary of updates
  if (updatedFiles.length > 0) {
    console.log(chalk.green(`\n📝 Updated components: ${updatedFiles.join(', ')}`));
  } else {
    console.log(chalk.yellow('⚠️  No files were updated. Please specify --colors, --fonts, or --assets.'));
  }
}

function showAnalysisSummary(config: MyAppConfig): void {
  console.log(chalk.cyan('\n📊 Project Analysis Summary:'));
  
  if (config.colorsFile) {
    console.log(chalk.green(`  🎨 Colors: ${config.colorsFile}`));
  }
  
  if (config.fontsFile) {
    console.log(chalk.green(`  📝 Fonts: ${config.fontsFile}`));
  }

  if (config.stylesFile || config.globalStylesFile) {
    console.log(chalk.green(`  🎨 Styles: ${config.stylesFile || config.globalStylesFile}`));
  }
  
  if (config.assetsDir) {
    console.log(chalk.green(`  📁 Assets: ${config.assetsDir}`));
  }
  
  if (config.componentsDir) {
    console.log(chalk.green(`  🧩 Components: ${config.componentsDir}`));
  }

  if (config.utilitiesDir) {
    console.log(chalk.green(`  🛠️  Utilities: ${config.utilitiesDir}`));
  }

  if (config.servicesDir) {
    console.log(chalk.green(`  ⚙️  Services: ${config.servicesDir}`));
  }

  if (config.hooksDir) {
    console.log(chalk.green(`  🪝 Hooks: ${config.hooksDir}`));
  }

  if (config.networkDir) {
    console.log(chalk.green(`  🌐 Network: ${config.networkDir}`));
  }

  if (config.storeDir) {
    console.log(chalk.green(`  💾 Store: ${config.storeDir}`));
  }

  if (config.workflowsDir) {
    console.log(chalk.green(`  🔄 CI/CD: ${config.workflowsDir}`));
  }

  if (config.components.length > 0) {
    console.log(chalk.green(`  📦 Found ${config.components.length} components: ${config.components.slice(0, 5).join(', ')}${config.components.length > 5 ? '...' : ''}`));
  }

  if (config.utilities.length > 0) {
    console.log(chalk.green(`  🔧 Found ${config.utilities.length} utilities: ${config.utilities.slice(0, 3).join(', ')}${config.utilities.length > 3 ? '...' : ''}`));
  }

  if (config.services.length > 0) {
    console.log(chalk.green(`  🔄 Found ${config.services.length} services: ${config.services.slice(0, 3).join(', ')}${config.services.length > 3 ? '...' : ''}`));
  }

  if (config.hooks.length > 0) {
    console.log(chalk.green(`  ⚡ Found ${config.hooks.length} hooks: ${config.hooks.slice(0, 3).join(', ')}${config.hooks.length > 3 ? '...' : ''}`));
  }

  if (config.workflows.length > 0) {
    console.log(chalk.green(`  🚀 Found ${config.workflows.length} workflows: ${config.workflows.join(', ')}`));
  }

  const deps = config.dependencies;
  if (deps.stateManagement || deps.navigation || deps.uiLibrary) {
    console.log(chalk.cyan('  🔧 Dependencies:'));
    if (deps.stateManagement) console.log(chalk.blue(`    State: ${deps.stateManagement}`));
    if (deps.navigation) console.log(chalk.blue(`    Navigation: ${deps.navigation}`));
    if (deps.uiLibrary) console.log(chalk.blue(`    UI: ${deps.uiLibrary}`));
  }

  if (deps.husky || deps.prettier || deps.eslint) {
    console.log(chalk.cyan('  ⚙️  Code Quality:'));
    if (deps.husky) console.log(chalk.blue(`    Husky: ✅ Git hooks`));
    if (deps.prettier) console.log(chalk.blue(`    Prettier: ✅ Code formatting`));
    if (deps.eslint) console.log(chalk.blue(`    ESLint: ✅ Code linting`));
  }
}

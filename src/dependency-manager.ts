import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export class DependencyManager {
  private projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

  async updateDependencies(oldDeps: any, newDeps: any): Promise<void> {
    const toInstall = this.getDependenciesToInstall(oldDeps, newDeps);
    const toUninstall = this.getDependenciesToUninstall(oldDeps, newDeps);

    if (toUninstall.length > 0) {
      await this.uninstallPackages(toUninstall);
    }

    if (toInstall.length > 0) {
      await this.installPackages(toInstall);
    }
  }

  private getDependenciesToInstall(oldDeps: any, newDeps: any): string[] {
    const toInstall: string[] = [];

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

  private getDependenciesToUninstall(oldDeps: any, newDeps: any): string[] {
    const toUninstall: string[] = [];

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

  private getStateManagementPackages(type: string): string[] {
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

  private getNavigationPackages(type: string): string[] {
    switch (type) {
      case 'react-navigation':
        return ['@react-navigation/native', '@react-navigation/native-stack'];
      case 'expo-router':
        return ['expo-router'];
      default:
        return [];
    }
  }

  private getUILibraryPackages(type: string): string[] {
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

  private getResponsivePackages(): string[] {
    return [
      'react-native-responsive-dimensions',
      'react-native-size-matters', 
      'react-native-responsive-fontsize'
    ];
  }

  async ensureResponsivePackages(): Promise<void> {
    console.log(chalk.blue('📱 Ensuring responsive packages are installed...'));
    
    try {
      const packageJsonPath = path.join(this.projectPath, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        
        const responsivePackages = this.getResponsivePackages();
        const missingPackages = responsivePackages.filter(pkg => !allDeps[pkg]);
        
        if (missingPackages.length > 0) {
          await this.installPackages(missingPackages);
        } else {
          console.log(chalk.green('✅ Responsive packages already installed'));
        }
      }
    } catch (error) {
      console.warn(chalk.yellow('⚠️  Warning: Could not check responsive packages'));
    }
  }

  async setupHuskyAndFormatting(): Promise<void> {
    console.log(chalk.blue('🐕 Setting up Husky and code formatting...'));
    
    try {
      const packageJsonPath = path.join(this.projectPath, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
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
        
        console.log(chalk.green('✅ Husky and formatting tools configured'));
      }
    } catch (error) {
      console.warn(chalk.yellow('⚠️  Warning: Could not setup Husky'));
    }
  }

  private async initializeHusky(): Promise<void> {
    try {
      // Initialize Husky
      await execa('npx', ['husky', 'init'], {
        cwd: this.projectPath,
        stdio: 'pipe'
      });
      
      console.log(chalk.blue('🔧 Initialized Husky'));
    } catch (error) {
      console.warn('Warning: Could not initialize Husky automatically');
    }
  }

  private async addFormattingScripts(): Promise<void> {
    try {
      const packageJsonPath = path.join(this.projectPath, 'package.json');
      const packageJson = await fs.readJson(packageJsonPath);
      
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
      
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      console.log(chalk.blue('📝 Added formatting scripts to package.json'));
      
    } catch (error) {
      console.warn('Warning: Could not update package.json scripts');
    }
  }

  private async installPackages(packages: string[]): Promise<void> {
    console.log(chalk.blue(`📦 Installing packages: ${packages.join(', ')}`));
    
    try {
      const packageManager = await this.detectPackageManager();
      const installCommand = packageManager === 'yarn' ? 'add' : 'install';
      
      await execa(packageManager, [installCommand, ...packages], {
        cwd: this.projectPath,
        stdio: 'inherit'
      });
      
      console.log(chalk.green(`✅ Successfully installed: ${packages.join(', ')}`));
    } catch (error) {
      console.error(chalk.red(`❌ Failed to install packages:`), error);
      throw error;
    }
  }

  private async uninstallPackages(packages: string[]): Promise<void> {
    console.log(chalk.blue(`🗑️  Uninstalling packages: ${packages.join(', ')}`));
    
    try {
      const packageManager = await this.detectPackageManager();
      const uninstallCommand = packageManager === 'yarn' ? 'remove' : 'uninstall';
      
      await execa(packageManager, [uninstallCommand, ...packages], {
        cwd: this.projectPath,
        stdio: 'inherit'
      });
      
      console.log(chalk.green(`✅ Successfully uninstalled: ${packages.join(', ')}`));
    } catch (error) {
      console.error(chalk.red(`❌ Failed to uninstall packages:`), error);
      throw error;
    }
  }

  private async detectPackageManager(): Promise<string> {
    const yarnLockPath = path.join(this.projectPath, 'yarn.lock');
    const pnpmLockPath = path.join(this.projectPath, 'pnpm-lock.yaml');
    
    if (await fs.pathExists(yarnLockPath)) {
      return 'yarn';
    }
    
    if (await fs.pathExists(pnpmLockPath)) {
      return 'pnpm';
    }
    
    return 'npm';
  }

  async installDependencies(): Promise<void> {
    console.log(chalk.blue('📦 Installing project dependencies...'));
    
    try {
      const packageManager = await this.detectPackageManager();
      
      await execa(packageManager, ['install'], {
        cwd: this.projectPath,
        stdio: 'inherit'
      });
      
      console.log(chalk.green('✅ Dependencies installed successfully'));
    } catch (error) {
      console.error(chalk.red('❌ Failed to install dependencies:'), error);
      throw error;
    }
  }
}

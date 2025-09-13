import fs from 'fs-extra';
import path from 'path';
import { ProjectAnalysis } from './types';

export class ProjectAnalyzer {
  private projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

  async analyze(): Promise<ProjectAnalysis> {
    const analysis: ProjectAnalysis = {
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
      const packageJsonPath = path.join(this.projectPath, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        analysis.packageJson = await fs.readJson(packageJsonPath);
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

    } catch (error) {
      console.warn('Warning: Error during analysis:', error);
    }

    return analysis;
  }

  private async findFile(possiblePaths: string[]): Promise<string | undefined> {
    for (const relativePath of possiblePaths) {
      const fullPath = path.join(this.projectPath, relativePath);
      if (await fs.pathExists(fullPath)) {
        return relativePath;
      }
    }
    return undefined;
  }

  private async findDirectory(possiblePaths: string[]): Promise<string | undefined> {
    for (const relativePath of possiblePaths) {
      const fullPath = path.join(this.projectPath, relativePath);
      if (await fs.pathExists(fullPath) && (await fs.stat(fullPath)).isDirectory()) {
        return relativePath;
      }
    }
    return undefined;
  }

  private async findComponents(componentsDir: string): Promise<string[]> {
    const components: string[] = [];
    const componentsPath = path.join(this.projectPath, componentsDir);

    try {
      const files = await fs.readdir(componentsPath, { withFileTypes: true });
      
      for (const file of files) {
        if (file.isFile() && (file.name.endsWith('.tsx') || file.name.endsWith('.ts') || file.name.endsWith('.jsx') || file.name.endsWith('.js'))) {
          const componentName = path.parse(file.name).name;
          if (componentName.charAt(0) === componentName.charAt(0).toUpperCase()) {
            components.push(componentName);
          }
        } else if (file.isDirectory()) {
          // Check for index file in subdirectory
          const subDir = path.join(componentsPath, file.name);
          const indexFiles = ['index.tsx', 'index.ts', 'index.jsx', 'index.js'];
          
          for (const indexFile of indexFiles) {
            if (await fs.pathExists(path.join(subDir, indexFile))) {
              const componentName = file.name;
              if (componentName.charAt(0) === componentName.charAt(0).toUpperCase()) {
                components.push(componentName);
              }
              break;
            }
          }
        }
      }
    } catch (error) {
      console.warn('Warning: Could not analyze components directory:', error);
    }

    return components;
  }

  private async findFilesList(dirPath: string): Promise<string[]> {
    const files: string[] = [];
    const fullPath = path.join(this.projectPath, dirPath);

    try {
      const entries = await fs.readdir(fullPath, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
          const fileName = path.parse(entry.name).name;
          files.push(fileName);
        } else if (entry.isDirectory()) {
          // Check for index file in subdirectory
          const subDir = path.join(fullPath, entry.name);
          const indexFiles = ['index.tsx', 'index.ts', 'index.jsx', 'index.js'];
          
          for (const indexFile of indexFiles) {
            if (await fs.pathExists(path.join(subDir, indexFile))) {
              files.push(entry.name);
              break;
            }
          }
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not analyze directory ${dirPath}:`, error);
    }

    return files;
  }

  private async findWorkflowFiles(workflowsDir: string): Promise<string[]> {
    const workflows: string[] = [];
    const workflowsPath = path.join(this.projectPath, workflowsDir);

    try {
      const files = await fs.readdir(workflowsPath, { withFileTypes: true });
      
      for (const file of files) {
        if (file.isFile() && (file.name.endsWith('.yml') || file.name.endsWith('.yaml'))) {
          const workflowName = path.parse(file.name).name;
          workflows.push(workflowName);
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not analyze workflows directory ${workflowsDir}:`, error);
    }

    return workflows;
  }

  private analyzeDependencies(analysis: ProjectAnalysis): void {
    const allDeps = {
      ...analysis.packageJson.dependencies,
      ...analysis.packageJson.devDependencies
    };

    // State Management (check Zustand first as it's preferred)
    if (allDeps['zustand']) {
      analysis.dependencies.stateManagement = 'zustand';
    } else if (allDeps['@reduxjs/toolkit'] || allDeps['redux']) {
      analysis.dependencies.stateManagement = 'redux';
    } else if (allDeps['mobx'] || allDeps['mobx-react-lite']) {
      analysis.dependencies.stateManagement = 'mobx';
    }

    // Navigation
    if (allDeps['@react-navigation/native']) {
      analysis.dependencies.navigation = 'react-navigation';
    } else if (allDeps['expo-router']) {
      analysis.dependencies.navigation = 'expo-router';
    }

    // UI Library
    if (allDeps['nativewind'] || allDeps['tailwindcss']) {
      analysis.dependencies.uiLibrary = 'nativewind';
    } else if (allDeps['react-native-elements']) {
      analysis.dependencies.uiLibrary = 'react-native-elements';
    } else if (allDeps['@ui-kitten/components']) {
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

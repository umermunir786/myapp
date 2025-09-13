import fs from 'fs-extra';
import path from 'path';
import { MyAppConfig, ProjectAnalysis } from './types';

export class ConfigManager {
  static async saveConfig(projectPath: string, analysis: ProjectAnalysis): Promise<MyAppConfig> {
    const config: MyAppConfig = {
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

    const configPath = path.join(projectPath, '.myappconfig.json');
    await fs.writeJson(configPath, config, { spaces: 2 });
    
    return config;
  }

  static async loadConfig(projectPath: string): Promise<MyAppConfig | null> {
    const configPath = path.join(projectPath, '.myappconfig.json');
    
    if (await fs.pathExists(configPath)) {
      try {
        return await fs.readJson(configPath);
      } catch (error) {
        console.warn('Warning: Could not read .myappconfig.json');
        return null;
      }
    }
    
    return null;
  }

  static async updateConfig(projectPath: string, updates: Partial<MyAppConfig>): Promise<MyAppConfig> {
    const existingConfig = await this.loadConfig(projectPath) || this.getDefaultConfig();
    const updatedConfig = { ...existingConfig, ...updates };
    
    const configPath = path.join(projectPath, '.myappconfig.json');
    await fs.writeJson(configPath, updatedConfig, { spaces: 2 });
    
    return updatedConfig;
  }

  private static getDefaultConfig(): MyAppConfig {
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

  static async findProjectRoot(startPath: string = process.cwd()): Promise<string | null> {
    let currentPath = path.resolve(startPath);
    
    while (currentPath !== path.dirname(currentPath)) {
      const configPath = path.join(currentPath, '.myappconfig.json');
      const packageJsonPath = path.join(currentPath, 'package.json');
      
      if (await fs.pathExists(configPath) || await fs.pathExists(packageJsonPath)) {
        return currentPath;
      }
      
      currentPath = path.dirname(currentPath);
    }
    
    return null;
  }
}

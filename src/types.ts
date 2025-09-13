export interface MyAppConfig {
  colorsFile: string;
  fontsFile: string;
  stylesFile?: string;
  globalStylesFile?: string;
  assetsDir: string;
  componentsDir: string;
  utilitiesDir?: string;
  servicesDir?: string;
  hooksDir?: string;
  networkDir?: string;
  storeDir?: string;
  workflowsDir?: string;
  huskyDir?: string;
  dependencies: {
    stateManagement?: string;
    navigation?: string;
    uiLibrary?: string;
    responsive?: string;
    husky?: boolean;
    prettier?: boolean;
    eslint?: boolean;
  };
  projectStructure: {
    [key: string]: string;
  };
  components: string[];
  utilities: string[];
  services: string[];
  hooks: string[];
  workflows: string[];
}

export interface CLIOptions {
  template?: string;
  colors?: string;
  fonts?: string;
  styles?: string;
  assets?: string;
  components?: string;
  utilities?: string;
  services?: string;
  hooks?: string;
  interactive?: boolean;
}

export interface ProjectAnalysis {
  colorsFile?: string;
  fontsFile?: string;
  stylesFile?: string;
  globalStylesFile?: string;
  assetsDir?: string;
  componentsDir?: string;
  utilitiesDir?: string;
  servicesDir?: string;
  hooksDir?: string;
  networkDir?: string;
  storeDir?: string;
  workflowsDir?: string;
  huskyDir?: string;
  components: string[];
  utilities: string[];
  services: string[];
  hooks: string[];
  workflows: string[];
  dependencies: {
    stateManagement?: string;
    navigation?: string;
    uiLibrary?: string;
    responsive?: string;
    husky?: boolean;
    prettier?: boolean;
    eslint?: boolean;
  };
  packageJson: any;
}

export interface InteractiveAnswers {
  projectName: string;
  colorsFile?: string;
  fontsFile?: string;
  assetsFolder?: string;
  stateManagement?: string;
  navigation?: string;
  uiLibrary?: string;
}

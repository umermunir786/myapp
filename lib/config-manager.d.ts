import { MyAppConfig, ProjectAnalysis } from './types';
export declare class ConfigManager {
    static saveConfig(projectPath: string, analysis: ProjectAnalysis): Promise<MyAppConfig>;
    static loadConfig(projectPath: string): Promise<MyAppConfig | null>;
    static updateConfig(projectPath: string, updates: Partial<MyAppConfig>): Promise<MyAppConfig>;
    private static getDefaultConfig;
    static findProjectRoot(startPath?: string): Promise<string | null>;
}
//# sourceMappingURL=config-manager.d.ts.map
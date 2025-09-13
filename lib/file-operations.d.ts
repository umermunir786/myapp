export declare class FileOperations {
    static copyTemplate(templatePath: string, targetPath: string, projectName: string): Promise<void>;
    static replaceFile(sourcePath: string, targetPath: string, relativePath: string): Promise<void>;
    static replaceDirectory(sourcePath: string, targetPath: string, relativePath: string): Promise<void>;
    static updateImports(projectPath: string, oldPath: string, newPath: string): Promise<void>;
    private static findAllSourceFiles;
    private static updateImportsInFile;
    static updateAppJsonConfig(projectPath: string, projectName: string): Promise<void>;
    static updateAppConfig(projectPath: string, assetsPath?: string): Promise<void>;
    static updateWorkflowsConfig(projectPath: string, projectName: string): Promise<void>;
    private static updateWorkflowFile;
    static setupHuskyConfiguration(projectPath: string, projectName: string): Promise<void>;
}
//# sourceMappingURL=file-operations.d.ts.map
export declare class DependencyManager {
    private projectPath;
    constructor(projectPath: string);
    updateDependencies(oldDeps: any, newDeps: any): Promise<void>;
    private getDependenciesToInstall;
    private getDependenciesToUninstall;
    private getStateManagementPackages;
    private getNavigationPackages;
    private getUILibraryPackages;
    private getResponsivePackages;
    ensureResponsivePackages(): Promise<void>;
    setupHuskyAndFormatting(): Promise<void>;
    private initializeHusky;
    private addFormattingScripts;
    private installPackages;
    private uninstallPackages;
    private detectPackageManager;
    installDependencies(): Promise<void>;
}
//# sourceMappingURL=dependency-manager.d.ts.map
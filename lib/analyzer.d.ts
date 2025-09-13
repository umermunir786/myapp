import { ProjectAnalysis } from './types';
export declare class ProjectAnalyzer {
    private projectPath;
    constructor(projectPath: string);
    analyze(): Promise<ProjectAnalysis>;
    private findFile;
    private findDirectory;
    private findComponents;
    private findFilesList;
    private findWorkflowFiles;
    private analyzeDependencies;
}
//# sourceMappingURL=analyzer.d.ts.map
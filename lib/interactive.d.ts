import { InteractiveAnswers } from './types';
export declare class InteractivePrompts {
    static getProjectSetup(): Promise<InteractiveAnswers>;
    static confirmAction(message: string): Promise<boolean>;
    static selectUpdateMode(): Promise<'single' | 'multiple' | 'all'>;
    static selectFilesToUpdate(availableFiles: string[]): Promise<string[]>;
}
//# sourceMappingURL=interactive.d.ts.map
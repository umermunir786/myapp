import { ProjectAnalyzer } from './analyzer';
import fs from 'fs-extra';
import path from 'path';

// Mock the fs-extra module
jest.mock('fs-extra');

describe('ProjectAnalyzer', () => {
  const mockFs = fs as jest.Mocked<typeof fs>;

  it('should correctly analyze a project', async () => {
    // Arrange
    const projectPath = '/fake/project';
    const analyzer = new ProjectAnalyzer(projectPath);

    // Mock file system responses
    mockFs.pathExists.mockImplementation(async (p: any) => {
      const relativePath = path.relative(projectPath, p);
      if ([
        'package.json',
        'constants/colors.ts',
        'constants/fonts.ts',
        'styles/global.ts',
        'assets',
        'components',
        'utils',
        'services',
        'hooks',
        'network',
        'store',
        '.github/workflows'
      ].includes(relativePath)) {
        return true;
      }
      return false;
    });

    mockFs.readJson.mockResolvedValue({ name: 'fake-project', dependencies: { react: 'latest' }, devDependencies: { typescript: 'latest' } } as any);
    mockFs.stat.mockResolvedValue({ isDirectory: () => true } as any);
    mockFs.readdir.mockImplementation(async (p: any) => {
        const dir = path.relative(projectPath, p);
        if (dir === 'components') {
            return [{ name: 'Button.tsx', isFile: () => true, isDirectory: () => false }] as any;
        }
        if (dir === 'utils') {
            return [{ name: 'helpers.ts', isFile: () => true, isDirectory: () => false }] as any;
        }
        return [] as any;
    });

    // Act
    const analysis = await analyzer.analyze();

    // Assert
    expect(analysis.packageJson.name).toBe('fake-project');
    expect(analysis.colorsFile).toBe('constants/colors.ts');
    expect(analysis.fontsFile).toBe('constants/fonts.ts');
    expect(analysis.globalStylesFile).toBe('styles/global.ts');
    expect(analysis.assetsDir).toBe('assets');
    expect(analysis.componentsDir).toBe('components');
    expect(analysis.utilitiesDir).toBe('utils');
    expect(analysis.servicesDir).toBe('services');
    expect(analysis.hooksDir).toBe('hooks');
    expect(analysis.networkDir).toBe('network');
    expect(analysis.storeDir).toBe('store');
    expect(analysis.workflowsDir).toBe('.github/workflows');
    expect(analysis.components).toEqual(['Button']);
    expect(analysis.utilities).toEqual(['helpers']);
  });
});
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export class FileOperations {
  static async copyTemplate(templatePath: string, targetPath: string, projectName: string): Promise<void> {
    try {
      console.log(chalk.blue(`📂 Copying template from ${templatePath} to ${targetPath}`));
      
      // Ensure template exists
      if (!await fs.pathExists(templatePath)) {
        throw new Error(`Template path does not exist: ${templatePath}`);
      }

      // Create target directory
      await fs.ensureDir(targetPath);

      // Copy all files and directories
      await fs.copy(templatePath, targetPath, {
        overwrite: true,
        filter: (src: string) => {
          // Skip node_modules, .git, and other unnecessary directories
          const basename = path.basename(src);
          return !['node_modules', '.git', '.expo', 'dist', 'build', '.nyc_output', 'coverage'].includes(basename);
        }
      });

      // Update package.json with new project name
      const packageJsonPath = path.join(targetPath, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        packageJson.name = projectName;
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      }

      // Update app.json with new project details
      await this.updateAppJsonConfig(targetPath, projectName);

      // Update GitHub workflows with new project name
      await this.updateWorkflowsConfig(targetPath, projectName);

      // Setup Husky and formatting if not already configured
      await this.setupHuskyConfiguration(targetPath, projectName);

      console.log(chalk.green(`✅ Template copied successfully to ${targetPath}`));
    } catch (error) {
      console.error(chalk.red(`❌ Error copying template:`), error);
      throw error;
    }
  }

  static async replaceFile(sourcePath: string, targetPath: string, relativePath: string): Promise<void> {
    try {
      const resolvedSourcePath = path.resolve(sourcePath);
      const fullTargetPath = path.join(targetPath, relativePath);
      
      // Check if source file exists
      if (!await fs.pathExists(resolvedSourcePath)) {
        throw new Error(`Source file does not exist: ${resolvedSourcePath}`);
      }
      
      // Ensure target directory exists
      await fs.ensureDir(path.dirname(fullTargetPath));
      
      // Remove read-only attribute on Windows if file exists
      if (await fs.pathExists(fullTargetPath)) {
        try {
          await fs.chmod(fullTargetPath, 0o666);
        } catch (error) {
          // Ignore chmod errors
        }
      }
      
      // Read source file and write to target
      const content = await fs.readFile(resolvedSourcePath, 'utf-8');
      await fs.writeFile(fullTargetPath, content);
      
      console.log(chalk.green(`✅ Updated ${relativePath}`));
    } catch (error) {
      console.error(chalk.red(`❌ Error replacing file ${relativePath}:`), error);
      throw error;
    }
  }

  static async replaceDirectory(sourcePath: string, targetPath: string, relativePath: string): Promise<void> {
    try {
      const resolvedSourcePath = path.resolve(sourcePath);
      const fullTargetPath = path.join(targetPath, relativePath);
      
      // Check if source directory exists
      if (!await fs.pathExists(resolvedSourcePath)) {
        throw new Error(`Source directory does not exist: ${resolvedSourcePath}`);
      }
      
      // Remove existing directory if it exists
      if (await fs.pathExists(fullTargetPath)) {
        await fs.remove(fullTargetPath);
      }
      
      // Ensure parent directory exists
      await fs.ensureDir(path.dirname(fullTargetPath));
      
      // Copy the new directory
      await fs.copy(resolvedSourcePath, fullTargetPath, { overwrite: true });
      
      console.log(chalk.green(`✅ Updated ${relativePath}/ directory`));
    } catch (error) {
      console.error(chalk.red(`❌ Error replacing directory ${relativePath}:`), error);
      throw error;
    }
  }

  static async updateImports(projectPath: string, oldPath: string, newPath: string): Promise<void> {
    try {
      const files = await this.findAllSourceFiles(projectPath);
      
      for (const file of files) {
        await this.updateImportsInFile(file, oldPath, newPath);
      }
    } catch (error) {
      console.warn(chalk.yellow(`⚠️  Warning: Could not update all imports - ${error}`));
    }
  }

  private static async findAllSourceFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !['node_modules', '.git', '.expo', 'dist', 'build'].includes(entry.name)) {
          const subFiles = await this.findAllSourceFiles(fullPath);
          files.push(...subFiles);
        } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not read directory ${dir}`);
    }
    
    return files;
  }

  private static async updateImportsInFile(filePath: string, oldPath: string, newPath: string): Promise<void> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Simple import path replacement - could be enhanced with AST parsing
      const oldImportPattern = new RegExp(`(['"\`])([^'"\`]*/${path.basename(oldPath, path.extname(oldPath))})(['"\`])`, 'g');
      const newImportPath = `${path.dirname(newPath)}/${path.basename(newPath, path.extname(newPath))}`;
      const updatedContent = content.replace(oldImportPattern, `$1${newImportPath}$3`);
      
      if (content !== updatedContent) {
        await fs.writeFile(filePath, updatedContent);
        console.log(chalk.blue(`📝 Updated imports in ${path.relative(process.cwd(), filePath)}`));
      }
    } catch (error) {
      console.warn(`Warning: Could not update imports in ${filePath}`);
    }
  }

  static async updateAppJsonConfig(projectPath: string, projectName: string): Promise<void> {
    try {
      const appJsonPath = path.join(projectPath, 'app.json');
      
      if (await fs.pathExists(appJsonPath)) {
        const appJson = await fs.readJson(appJsonPath);
        
        if (appJson.expo) {
          // Update app name and slug
          appJson.expo.name = projectName;
          appJson.expo.slug = projectName.toLowerCase().replace(/[^a-z0-9]/g, '_');
          
          // Update scheme
          appJson.expo.scheme = `${projectName.toLowerCase()}app`;
          
          // Update Android package name
          if (appJson.expo.android) {
            const packageName = `com.${projectName.toLowerCase().replace(/[^a-z0-9]/g, '')}.app`;
            appJson.expo.android.package = packageName;
          }
          
          // Generate new EAS project ID placeholder (user should update this)
          if (appJson.expo.extra?.eas) {
            appJson.expo.extra.eas.projectId = "update-this-with-your-eas-project-id";
          }
          
          // Update updates URL placeholder
          if (appJson.expo.updates) {
            appJson.expo.updates.url = "update-this-with-your-eas-updates-url";
          }
        }
        
        await fs.writeJson(appJsonPath, appJson, { spaces: 2 });
        console.log(chalk.green(`✅ Updated app.json with project name: ${projectName}`));
      }
    } catch (error) {
      console.warn(chalk.yellow(`⚠️  Warning: Could not update app.json - ${error}`));
    }
  }

  static async updateAppConfig(projectPath: string, assetsPath?: string): Promise<void> {
    try {
      // Update app.json or app.config.js for assets
      const appJsonPath = path.join(projectPath, 'app.json');
      
      if (assetsPath && await fs.pathExists(appJsonPath)) {
        const appJson = await fs.readJson(appJsonPath);
        
        // Update icon and splash if they exist in the new assets
        const iconPath = path.join(assetsPath, 'icon.png');
        const splashPath = path.join(assetsPath, 'splash.png');
        const adaptiveIconPath = path.join(assetsPath, 'adaptive-icon.png');
        const faviconPath = path.join(assetsPath, 'favicon.png');
        
        if (await fs.pathExists(iconPath)) {
          appJson.expo = appJson.expo || {};
          appJson.expo.icon = './assets/icon.png';
        }
        
        if (await fs.pathExists(adaptiveIconPath)) {
          appJson.expo = appJson.expo || {};
          appJson.expo.android = appJson.expo.android || {};
          appJson.expo.android.adaptiveIcon = appJson.expo.android.adaptiveIcon || {};
          appJson.expo.android.adaptiveIcon.foregroundImage = './assets/adaptive-icon.png';
        }
        
        if (await fs.pathExists(faviconPath)) {
          appJson.expo = appJson.expo || {};
          appJson.expo.web = appJson.expo.web || {};
          appJson.expo.web.favicon = './assets/favicon.png';
        }
        
        // Update splash screen configuration
        if (await fs.pathExists(splashPath)) {
          appJson.expo = appJson.expo || {};
          appJson.expo.splash = appJson.expo.splash || {};
          appJson.expo.splash.image = './assets/splash.png';
        }
        
        await fs.writeJson(appJsonPath, appJson, { spaces: 2 });
        console.log(chalk.green(`✅ Updated app.json assets configuration`));
      }
    } catch (error) {
      console.warn(chalk.yellow(`⚠️  Warning: Could not update app configuration - ${error}`));
    }
  }

  static async updateWorkflowsConfig(projectPath: string, projectName: string): Promise<void> {
    try {
      const workflowsPath = path.join(projectPath, '.github', 'workflows');
      
      if (await fs.pathExists(workflowsPath)) {
        const files = await fs.readdir(workflowsPath);
        
        for (const file of files) {
          if (file.endsWith('.yml') || file.endsWith('.yaml')) {
            const filePath = path.join(workflowsPath, file);
            await this.updateWorkflowFile(filePath, projectName);
          }
        }
        
        console.log(chalk.green(`✅ Updated GitHub workflows for project: ${projectName}`));
      }
    } catch (error) {
      console.warn(chalk.yellow(`⚠️  Warning: Could not update GitHub workflows - ${error}`));
    }
  }

  private static async updateWorkflowFile(filePath: string, projectName: string): Promise<void> {
    try {
      let content = await fs.readFile(filePath, 'utf-8');
      
      // Generate new names based on project
      const kebabCaseName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const snakeCaseName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const packageName = `com.${projectName.toLowerCase().replace(/[^a-z0-9]/g, '')}.app`;
      
      // Update workflow name
      content = content.replace(
        /^name:\s*.*$/m,
        `name: ${projectName} Build & Distribution`
      );
      
      // Update artifact names
      content = content.replace(
        /name:\s*android-apk/g,
        `name: ${kebabCaseName}-android-apk`
      );
      
      content = content.replace(
        /name:\s*ios-ipa/g,
        `name: ${kebabCaseName}-ios-ipa`
      );
      
      // Update any hardcoded app names or packages
      content = content.replace(/elloo_app/g, snakeCaseName);
      content = content.replace(/Elloo/g, projectName);
      content = content.replace(/elloo/g, kebabCaseName);
      
      // Update Android package references
      content = content.replace(
        /com\.syntaxel\.elloo/g,
        packageName
      );
      
      // Update Firebase app references (user will need to update with their own)
      content = content.replace(
        /FIREBASE_TOKEN/g,
        `${projectName.toUpperCase()}_FIREBASE_TOKEN`
      );
      
      await fs.writeFile(filePath, content);
      console.log(chalk.blue(`📝 Updated workflow: ${path.basename(filePath)}`));
      
    } catch (error) {
      console.warn(`Warning: Could not update workflow file ${path.basename(filePath)}`);
    }
  }

  static async setupHuskyConfiguration(projectPath: string, projectName: string): Promise<void> {
    try {
      const huskyDir = path.join(projectPath, '.husky');
      
      // Create .husky directory if it doesn't exist
      await fs.ensureDir(huskyDir);
      
      // Create professional pre-commit hook
      const preCommitContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks for ${projectName}..."

# Format and lint staged files
npx lint-staged

# Check TypeScript compilation
echo "📝 Checking TypeScript..."
npx tsc --noEmit

# Check for console.log statements (warning only)
if git diff --cached --name-only | grep -E '\\.(js|jsx|ts|tsx)$' | xargs grep -l 'console\\.log' 2>/dev/null; then
  echo "⚠️  Warning: Found console.log statements in staged files"
  echo "Consider removing them before committing to production"
fi

echo "✅ Pre-commit checks passed for ${projectName}!"
`;

      await fs.writeFile(path.join(huskyDir, 'pre-commit'), preCommitContent);
      await fs.chmod(path.join(huskyDir, 'pre-commit'), 0o755);

      // Create commit-msg hook for conventional commits
      const commitMsgContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Validate commit message format for ${projectName}
commit_regex='^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\\(.+\\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
  echo "❌ Invalid commit message format for ${projectName}!"
  echo ""
  echo "Use conventional commits format:"
  echo "  feat: add new feature"
  echo "  fix: bug fix"
  echo "  docs: documentation changes"
  echo "  style: formatting changes"
  echo "  refactor: code refactoring"
  echo "  test: adding tests"
  echo "  chore: maintenance tasks"
  echo ""
  exit 1
fi

echo "✅ Commit message format valid for ${projectName}!"
`;

      await fs.writeFile(path.join(huskyDir, 'commit-msg'), commitMsgContent);
      await fs.chmod(path.join(huskyDir, 'commit-msg'), 0o755);

      // Create prettier configuration
      const prettierConfig = {
        semi: true,
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'avoid',
        endOfLine: 'lf',
        jsxSingleQuote: true,
      };

      await fs.writeJson(path.join(projectPath, '.prettierrc'), prettierConfig, { spaces: 2 });

      // Create prettier ignore
      const prettierIgnore = `node_modules
.expo
dist
build
lib
coverage
android/build
ios/build
*.log
*.lock
.git
.env.*
`;

      await fs.writeFile(path.join(projectPath, '.prettierignore'), prettierIgnore);

      console.log(chalk.green(`✅ Husky configuration setup for ${projectName}`));
      
    } catch (error) {
      console.warn(chalk.yellow(`⚠️  Warning: Could not setup Husky configuration - ${error}`));
    }
  }
}

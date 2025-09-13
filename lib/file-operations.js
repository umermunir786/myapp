"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileOperations = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
class FileOperations {
    static async copyTemplate(templatePath, targetPath, projectName) {
        try {
            console.log(chalk_1.default.blue(`📂 Copying template from ${templatePath} to ${targetPath}`));
            // Ensure template exists
            if (!await fs_extra_1.default.pathExists(templatePath)) {
                throw new Error(`Template path does not exist: ${templatePath}`);
            }
            // Create target directory
            await fs_extra_1.default.ensureDir(targetPath);
            // Copy all files and directories
            await fs_extra_1.default.copy(templatePath, targetPath, {
                overwrite: true,
                filter: (src) => {
                    // Skip node_modules, .git, and other unnecessary directories
                    const basename = path_1.default.basename(src);
                    return !['node_modules', '.git', '.expo', 'dist', 'build', '.nyc_output', 'coverage'].includes(basename);
                }
            });
            // Update package.json with new project name
            const packageJsonPath = path_1.default.join(targetPath, 'package.json');
            if (await fs_extra_1.default.pathExists(packageJsonPath)) {
                const packageJson = await fs_extra_1.default.readJson(packageJsonPath);
                packageJson.name = projectName;
                await fs_extra_1.default.writeJson(packageJsonPath, packageJson, { spaces: 2 });
            }
            // Update app.json with new project details
            await this.updateAppJsonConfig(targetPath, projectName);
            // Update GitHub workflows with new project name
            await this.updateWorkflowsConfig(targetPath, projectName);
            // Setup Husky and formatting if not already configured
            await this.setupHuskyConfiguration(targetPath, projectName);
            console.log(chalk_1.default.green(`✅ Template copied successfully to ${targetPath}`));
        }
        catch (error) {
            console.error(chalk_1.default.red(`❌ Error copying template:`), error);
            throw error;
        }
    }
    static async replaceFile(sourcePath, targetPath, relativePath) {
        try {
            const resolvedSourcePath = path_1.default.resolve(sourcePath);
            const fullTargetPath = path_1.default.join(targetPath, relativePath);
            // Check if source file exists
            if (!await fs_extra_1.default.pathExists(resolvedSourcePath)) {
                throw new Error(`Source file does not exist: ${resolvedSourcePath}`);
            }
            // Ensure target directory exists
            await fs_extra_1.default.ensureDir(path_1.default.dirname(fullTargetPath));
            // Remove read-only attribute on Windows if file exists
            if (await fs_extra_1.default.pathExists(fullTargetPath)) {
                try {
                    await fs_extra_1.default.chmod(fullTargetPath, 0o666);
                }
                catch (error) {
                    // Ignore chmod errors
                }
            }
            // Read source file and write to target
            const content = await fs_extra_1.default.readFile(resolvedSourcePath, 'utf-8');
            await fs_extra_1.default.writeFile(fullTargetPath, content);
            console.log(chalk_1.default.green(`✅ Updated ${relativePath}`));
        }
        catch (error) {
            console.error(chalk_1.default.red(`❌ Error replacing file ${relativePath}:`), error);
            throw error;
        }
    }
    static async replaceDirectory(sourcePath, targetPath, relativePath) {
        try {
            const resolvedSourcePath = path_1.default.resolve(sourcePath);
            const fullTargetPath = path_1.default.join(targetPath, relativePath);
            // Check if source directory exists
            if (!await fs_extra_1.default.pathExists(resolvedSourcePath)) {
                throw new Error(`Source directory does not exist: ${resolvedSourcePath}`);
            }
            // Remove existing directory if it exists
            if (await fs_extra_1.default.pathExists(fullTargetPath)) {
                await fs_extra_1.default.remove(fullTargetPath);
            }
            // Ensure parent directory exists
            await fs_extra_1.default.ensureDir(path_1.default.dirname(fullTargetPath));
            // Copy the new directory
            await fs_extra_1.default.copy(resolvedSourcePath, fullTargetPath, { overwrite: true });
            console.log(chalk_1.default.green(`✅ Updated ${relativePath}/ directory`));
        }
        catch (error) {
            console.error(chalk_1.default.red(`❌ Error replacing directory ${relativePath}:`), error);
            throw error;
        }
    }
    static async updateImports(projectPath, oldPath, newPath) {
        try {
            const files = await this.findAllSourceFiles(projectPath);
            for (const file of files) {
                await this.updateImportsInFile(file, oldPath, newPath);
            }
        }
        catch (error) {
            console.warn(chalk_1.default.yellow(`⚠️  Warning: Could not update all imports - ${error}`));
        }
    }
    static async findAllSourceFiles(dir) {
        const files = [];
        try {
            const entries = await fs_extra_1.default.readdir(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path_1.default.join(dir, entry.name);
                if (entry.isDirectory() && !['node_modules', '.git', '.expo', 'dist', 'build'].includes(entry.name)) {
                    const subFiles = await this.findAllSourceFiles(fullPath);
                    files.push(...subFiles);
                }
                else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
                    files.push(fullPath);
                }
            }
        }
        catch (error) {
            console.warn(`Warning: Could not read directory ${dir}`);
        }
        return files;
    }
    static async updateImportsInFile(filePath, oldPath, newPath) {
        try {
            const content = await fs_extra_1.default.readFile(filePath, 'utf-8');
            // Simple import path replacement - could be enhanced with AST parsing
            const oldImportPattern = new RegExp(`(['"\`])([^'"\`]*/${path_1.default.basename(oldPath, path_1.default.extname(oldPath))})(['"\`])`, 'g');
            const newImportPath = `${path_1.default.dirname(newPath)}/${path_1.default.basename(newPath, path_1.default.extname(newPath))}`;
            const updatedContent = content.replace(oldImportPattern, `$1${newImportPath}$3`);
            if (content !== updatedContent) {
                await fs_extra_1.default.writeFile(filePath, updatedContent);
                console.log(chalk_1.default.blue(`📝 Updated imports in ${path_1.default.relative(process.cwd(), filePath)}`));
            }
        }
        catch (error) {
            console.warn(`Warning: Could not update imports in ${filePath}`);
        }
    }
    static async updateAppJsonConfig(projectPath, projectName) {
        try {
            const appJsonPath = path_1.default.join(projectPath, 'app.json');
            if (await fs_extra_1.default.pathExists(appJsonPath)) {
                const appJson = await fs_extra_1.default.readJson(appJsonPath);
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
                await fs_extra_1.default.writeJson(appJsonPath, appJson, { spaces: 2 });
                console.log(chalk_1.default.green(`✅ Updated app.json with project name: ${projectName}`));
            }
        }
        catch (error) {
            console.warn(chalk_1.default.yellow(`⚠️  Warning: Could not update app.json - ${error}`));
        }
    }
    static async updateAppConfig(projectPath, assetsPath) {
        try {
            // Update app.json or app.config.js for assets
            const appJsonPath = path_1.default.join(projectPath, 'app.json');
            if (assetsPath && await fs_extra_1.default.pathExists(appJsonPath)) {
                const appJson = await fs_extra_1.default.readJson(appJsonPath);
                // Update icon and splash if they exist in the new assets
                const iconPath = path_1.default.join(assetsPath, 'icon.png');
                const splashPath = path_1.default.join(assetsPath, 'splash.png');
                const adaptiveIconPath = path_1.default.join(assetsPath, 'adaptive-icon.png');
                const faviconPath = path_1.default.join(assetsPath, 'favicon.png');
                if (await fs_extra_1.default.pathExists(iconPath)) {
                    appJson.expo = appJson.expo || {};
                    appJson.expo.icon = './assets/icon.png';
                }
                if (await fs_extra_1.default.pathExists(adaptiveIconPath)) {
                    appJson.expo = appJson.expo || {};
                    appJson.expo.android = appJson.expo.android || {};
                    appJson.expo.android.adaptiveIcon = appJson.expo.android.adaptiveIcon || {};
                    appJson.expo.android.adaptiveIcon.foregroundImage = './assets/adaptive-icon.png';
                }
                if (await fs_extra_1.default.pathExists(faviconPath)) {
                    appJson.expo = appJson.expo || {};
                    appJson.expo.web = appJson.expo.web || {};
                    appJson.expo.web.favicon = './assets/favicon.png';
                }
                // Update splash screen configuration
                if (await fs_extra_1.default.pathExists(splashPath)) {
                    appJson.expo = appJson.expo || {};
                    appJson.expo.splash = appJson.expo.splash || {};
                    appJson.expo.splash.image = './assets/splash.png';
                }
                await fs_extra_1.default.writeJson(appJsonPath, appJson, { spaces: 2 });
                console.log(chalk_1.default.green(`✅ Updated app.json assets configuration`));
            }
        }
        catch (error) {
            console.warn(chalk_1.default.yellow(`⚠️  Warning: Could not update app configuration - ${error}`));
        }
    }
    static async updateWorkflowsConfig(projectPath, projectName) {
        try {
            const workflowsPath = path_1.default.join(projectPath, '.github', 'workflows');
            if (await fs_extra_1.default.pathExists(workflowsPath)) {
                const files = await fs_extra_1.default.readdir(workflowsPath);
                for (const file of files) {
                    if (file.endsWith('.yml') || file.endsWith('.yaml')) {
                        const filePath = path_1.default.join(workflowsPath, file);
                        await this.updateWorkflowFile(filePath, projectName);
                    }
                }
                console.log(chalk_1.default.green(`✅ Updated GitHub workflows for project: ${projectName}`));
            }
        }
        catch (error) {
            console.warn(chalk_1.default.yellow(`⚠️  Warning: Could not update GitHub workflows - ${error}`));
        }
    }
    static async updateWorkflowFile(filePath, projectName) {
        try {
            let content = await fs_extra_1.default.readFile(filePath, 'utf-8');
            // Generate new names based on project
            const kebabCaseName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
            const snakeCaseName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const packageName = `com.${projectName.toLowerCase().replace(/[^a-z0-9]/g, '')}.app`;
            // Update workflow name
            content = content.replace(/^name:\s*.*$/m, `name: ${projectName} Build & Distribution`);
            // Update artifact names
            content = content.replace(/name:\s*android-apk/g, `name: ${kebabCaseName}-android-apk`);
            content = content.replace(/name:\s*ios-ipa/g, `name: ${kebabCaseName}-ios-ipa`);
            // Update any hardcoded app names or packages
            content = content.replace(/elloo_app/g, snakeCaseName);
            content = content.replace(/Elloo/g, projectName);
            content = content.replace(/elloo/g, kebabCaseName);
            // Update Android package references
            content = content.replace(/com\.syntaxel\.elloo/g, packageName);
            // Update Firebase app references (user will need to update with their own)
            content = content.replace(/FIREBASE_TOKEN/g, `${projectName.toUpperCase()}_FIREBASE_TOKEN`);
            await fs_extra_1.default.writeFile(filePath, content);
            console.log(chalk_1.default.blue(`📝 Updated workflow: ${path_1.default.basename(filePath)}`));
        }
        catch (error) {
            console.warn(`Warning: Could not update workflow file ${path_1.default.basename(filePath)}`);
        }
    }
    static async setupHuskyConfiguration(projectPath, projectName) {
        try {
            const huskyDir = path_1.default.join(projectPath, '.husky');
            // Create .husky directory if it doesn't exist
            await fs_extra_1.default.ensureDir(huskyDir);
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
            await fs_extra_1.default.writeFile(path_1.default.join(huskyDir, 'pre-commit'), preCommitContent);
            await fs_extra_1.default.chmod(path_1.default.join(huskyDir, 'pre-commit'), 0o755);
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
            await fs_extra_1.default.writeFile(path_1.default.join(huskyDir, 'commit-msg'), commitMsgContent);
            await fs_extra_1.default.chmod(path_1.default.join(huskyDir, 'commit-msg'), 0o755);
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
            await fs_extra_1.default.writeJson(path_1.default.join(projectPath, '.prettierrc'), prettierConfig, { spaces: 2 });
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
            await fs_extra_1.default.writeFile(path_1.default.join(projectPath, '.prettierignore'), prettierIgnore);
            console.log(chalk_1.default.green(`✅ Husky configuration setup for ${projectName}`));
        }
        catch (error) {
            console.warn(chalk_1.default.yellow(`⚠️  Warning: Could not setup Husky configuration - ${error}`));
        }
    }
}
exports.FileOperations = FileOperations;
//# sourceMappingURL=file-operations.js.map
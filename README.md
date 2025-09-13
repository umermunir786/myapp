# create-myapp(Template dd)

A powerful Node.js CLI tool for creating and managing React Native/Expo applications with automated template management and file replacement.

## Features

- 🔍 **Smart Project Analysis**: Automatically detects project structure, dependencies, and components
- 📋 **Template Management**: Copy and analyze reference projects for future automation
- 🔄 **Automated Updates**: Replace colors, fonts, assets, and components with a single command
- 📦 **Dependency Management**: Automatically install/uninstall packages based on project needs
- 🎯 **Interactive Mode**: Guided setup with prompts when no CLI arguments provided
- 🔧 **Configuration Persistence**: Stores project mappings in `.myappconfig.json`

## Installation

```bash
npm install -g create-myapp
# or
yarn global add create-myapp
```

## Usage

### First-time setup with a reference template

```bash
create-myapp MyNewProject --template ./ReferenceApp
```

This will:

- Copy the reference project to a new directory
- Analyze the project structure (colors, fonts, assets, components)
- Save the mapping in `.myappconfig.json`
- Install dependencies

### Update existing project

```bash
# Update colors only
create-myapp MyProject --colors ./newColors.ts

# Update fonts only
create-myapp MyProject --fonts ./newFonts.ts

# Update assets only
create-myapp MyProject --assets ./BrandAssets

# Update multiple components
create-myapp MyProject --colors ./newColors.ts --fonts ./newFonts.ts --assets ./BrandAssets
```

### Interactive mode

```bash
create-myapp --interactive
# or just
create-myapp
```

## Configuration

The tool creates a `.myappconfig.json` file in your project root:

```json
{
  "colorsFile": "constants/colors.ts",
  "fontsFile": "constants/fonts.ts",
  "assetsDir": "assets",
  "componentsDir": "components",
  "dependencies": {
    "stateManagement": "redux",
    "navigation": "expo-router",
    "uiLibrary": "nativewind"
  },
  "projectStructure": {
    "colors": "constants/colors.ts",
    "fonts": "constants/fonts.ts",
    "assets": "assets",
    "components": "components"
  },
  "components": ["Button", "Header", "Text"]
}
```

## Supported Dependencies

### State Management

- Redux Toolkit (`redux`)
- Zustand (`zustand`)
- MobX (`mobx`)

### Navigation

- React Navigation (`react-navigation`)
- Expo Router (`expo-router`)

### UI Libraries

- NativeWind/Tailwind (`nativewind`)
- React Native Elements (`react-native-elements`)
- UI Kitten (`ui-kitten`)

## CLI Options

| Option              | Alias | Description                        |
| ------------------- | ----- | ---------------------------------- |
| `--template <path>` | `-t`  | Path to reference project template |
| `--colors <path>`   | `-c`  | Path to new colors file            |
| `--fonts <path>`    | `-f`  | Path to new fonts file             |
| `--assets <path>`   | `-a`  | Path to new assets directory       |
| `--interactive`     |       | Run in interactive mode            |

## Examples

### Complete workflow

1. **Setup with reference project:**

   ```bash
   create-myapp BrandApp --template ./MyReferenceApp
   ```

2. **Update with new brand assets:**

   ```bash
   create-myapp BrandApp --colors ./client-colors.ts --assets ./ClientAssets
   ```

3. **Interactive update:**
   ```bash
   create-myapp BrandApp --interactive
   ```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development
npm run dev

# Test locally
npm link
create-myapp --help
```

## License

MIT

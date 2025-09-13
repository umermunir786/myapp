# create-myapp Examples

## Using Your MyBrandApp as Reference Template

### 1. Create base project from your MyBrandApp template

```bash
create-myapp ClientProject --template ./MyBrandApp
```

This creates a new Expo app with:
- ✅ Your updated brand colors (`constants/colors.js`)
- ✅ Your custom fonts (`constants/fonts.js`) 
- ✅ Your brand assets (`assets/`)
- ✅ All 26+ components from Elloo
- ✅ Services directory with validation
- ✅ Redux store setup
- ✅ Network utilities
- ✅ Custom hooks

### 2. Quick brand updates for client projects

```bash
# Update just colors for a client
create-myapp ClientProject --colors ./client-colors.js

# Update colors, fonts and assets together
create-myapp ClientProject --colors ./client-colors.js --fonts ./client-fonts.js --assets ./ClientAssets

# Add custom services (validation, API, etc.)
create-myapp ClientProject --services ./client-services

# Add custom Zustand store
create-myapp ClientProject --utilities ./zustand-store
```

### 3. Complete client customization

```bash
create-myapp ClientProject --colors ./client-colors.js --fonts ./client-fonts.js --assets ./ClientAssets --services ./custom-validations
```

## Example Usage with Original Elloo Frontend Template

### 1. First-time setup using Elloo as reference

```bash
create-myapp MyNewApp --template ./Elloo-app-frontend
```

This will:
- Copy the entire Elloo frontend structure
- Analyze and detect:
  - Colors: `constants/colors.js`
  - Fonts: `constants/fonts.js`  
  - Assets: `assets/` directory
  - Components: All 26+ components (Button, Header, etc.)
  - Dependencies: Redux, React Navigation, Expo Router
- Save configuration in `.myappconfig.json`
- Install all dependencies

### 2. Update with new brand colors

```bash
create-myapp MyNewApp --colors ./brand-colors.js
```

Example `brand-colors.js`:
```javascript
const tintColorLight = "#FF6B35";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    primary: "#FF6B35", // New brand color
    button: "#1A1A1A",
    // ... rest of colors
  },
  dark: {
    // ... dark theme colors
  },
};
```

### 3. Update fonts 

```bash
create-myapp MyNewApp --fonts ./custom-fonts.js
```

Example `custom-fonts.js`:
```javascript
export const FontFamily = {
  InterRegular: "Inter-Regular",
  InterBold: "Inter-Bold", 
  RobotoMedium: "Roboto-Medium",
  // ... your custom fonts
};
```

### 4. Update assets (icons, images, etc.)

```bash  
create-myapp MyNewApp --assets ./BrandAssets
```

The tool will:
- Replace the entire `assets/` directory
- Update `app.json` if icon.png or splash.png are found
- Preserve the folder structure (fonts/, images/, tempImages/)

### 5. Update multiple components at once

```bash
create-myapp MyNewApp --colors ./new-colors.js --fonts ./new-fonts.js --assets ./NewAssets
```

### 6. Interactive mode (guided setup)

```bash
create-myapp --interactive
```

This will prompt you for:
- Project name
- Colors file path (optional)  
- Fonts file path (optional)
- Assets folder path (optional)
- State management preference (Redux/Zustand/MobX)
- Navigation preference (React Navigation/Expo Router)
- UI library preference (NativeWind/React Native Elements/UI Kitten)

## Generated Configuration

After analyzing the Elloo frontend, your `.myappconfig.json` will look like:

```json
{
  "colorsFile": "constants/colors.js",
  "fontsFile": "constants/fonts.js",
  "assetsDir": "assets", 
  "componentsDir": "components",
  "dependencies": {
    "stateManagement": "redux",
    "navigation": "react-navigation"
  },
  "components": [
    "AlertModal", "Button", "Camera", "CText", "Header", 
    "InputField", "Spinner", "CustomModal", "PhoneInput",
    // ... and 17 more components
  ]
}
```

## Workflow Tips

1. **One-time setup**: Use `--template` to create your base project from Elloo
2. **Regular updates**: Use `--colors`, `--fonts`, `--assets` to swap in new branding
3. **Batch updates**: Combine multiple flags to update everything at once
4. **Quick changes**: Target specific files when you only need to update one thing

The tool automatically handles:
- Import path updates
- App.json configuration updates  
- Dependency management
- Component discovery
- File structure preservation

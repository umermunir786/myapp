# Quick Start - MyBrandApp Template Workflow

## Your Enhanced Workflow

### 🎯 **Goal**: Use MyBrandApp as your base template for creating client projects

### 📋 **Setup** (One-time)
```bash
cd create-myapp
npm run build
```

### 🚀 **Create New Client Project**
```bash
# Use your MyBrandApp as the base template
node lib/cli.js ClientApp --template ./MyBrandApp
```

**What this creates:**
- ✅ Full Expo app structure 
- ✅ Your brand colors (`constants/colors.js`)
- ✅ Your custom fonts (`constants/fonts.js`)
- ✅ Your assets directory (`assets/`)
- ✅ All Elloo components (`components/`)
- ✅ Services with validation (`services/`)
- ✅ Redux store setup (`store/`)
- ✅ Network utilities (`network/`)
- ✅ Custom hooks (`hooks/`)

### 🎨 **Update Client Branding**
```bash
# Just colors
node lib/cli.js ClientApp --colors ./new-brand-colors.js

# Colors + Fonts
node lib/cli.js ClientApp --colors ./new-colors.js --fonts ./new-fonts.js

# Complete rebrand
node lib/cli.js ClientApp --colors ./new-colors.js --fonts ./new-fonts.js --assets ./NewBrandAssets
```

### 🔧 **Add Custom Features**
```bash
# Add client-specific validation services
node lib/cli.js ClientApp --services ./client-validations

# Add Zustand store (if switching from Redux)
node lib/cli.js ClientApp --utilities ./zustand-stores

# Add custom components
node lib/cli.js ClientApp --components ./client-components
```

## 📁 **File Structure After Creation**

```
ClientApp/
├── app/                    # Expo router pages
├── assets/                 # Your brand assets (replaceable)
├── components/             # All Elloo components (replaceable)
├── constants/
│   ├── colors.js          # Your brand colors (replaceable)
│   └── fonts.js           # Your fonts (replaceable)
├── hooks/                 # Custom React hooks
├── network/               # API utilities
├── services/              # Validation & business logic (replaceable)
├── store/                 # Redux state management
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── .myappconfig.json      # CLI configuration
```

## 🎨 **Brand File Examples**

### Colors (`new-brand-colors.js`)
```javascript
export const Colors = {
  light: {
    primary: "#your-brand-color",
    secondary: "#your-secondary-color",
    // ... rest of your color system
  }
};
```

### Fonts (`new-brand-fonts.js`)
```javascript
export const FontFamily = {
  BrandRegular: "YourBrand-Regular",
  BrandBold: "YourBrand-Bold",
  // ... your font system
};
```

### Services (`client-validations/`)
- Custom validation logic
- API service configurations
- Business rule implementations

## ⚡ **Quick Commands**

```bash
# Create from your template
create-myapp [ProjectName] --template ./MyBrandApp

# Update brand colors
create-myapp [ProjectName] --colors ./new-colors.js

# Complete rebrand
create-myapp [ProjectName] --colors ./colors.js --fonts ./fonts.js --assets ./assets

# Run the project
cd [ProjectName] && expo start
```

## 🔄 **Typical Workflow**

1. **Setup**: `create-myapp ClientApp --template ./MyBrandApp`
2. **Brand**: `create-myapp ClientApp --colors ./client-colors.js --assets ./ClientAssets`  
3. **Develop**: `cd ClientApp && expo start`
4. **Deploy**: Use existing Expo/EAS build process

Your MyBrandApp becomes the **perfect starting point** for all client projects! 🎉

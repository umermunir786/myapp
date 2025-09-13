# 🚀 Elloo App - CI/CD Pipeline Setup

Automated Android builds and Firebase App Distribution using GitHub Actions and Fastlane.

## 📋 Prerequisites

1. **Firebase Project Setup**
   - Create a Firebase project
   - Enable Firebase App Distribution
   - Add Android app to Firebase project
   - Download `google-services.json`

2. **Android Release Keystore**
   - Generate a release keystore for app signing
   - Keep keystore file secure and backed up

3. **GitHub Secrets Configuration**
   - Set up required secrets in repository settings

## 🔑 Required GitHub Secrets

Add these secrets in **Settings → Secrets and variables → Actions**:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `FIREBASE_TOKEN` | Firebase CLI auth token | `1//0abcd...xyz` |
| `FIREBASE_APP_ID` | Firebase App ID | `1:123456789:android:abcd1234` |
| `ANDROID_KEYSTORE_BASE64` | Base64 encoded keystore file | `MIIEvgIBADANBgkq...` |
| `KEYSTORE_PASSWORD` | Keystore password | `your_keystore_password` |
| `KEY_ALIAS` | Key alias name | `your_key_alias` |
| `KEY_PASSWORD` | Key password | `your_key_password` |

## 🛠 Setup Instructions

### 1. Firebase Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login:ci
# Copy the token and add as FIREBASE_TOKEN secret
```

### 2. Keystore Preparation

```bash
# Generate release keystore (if you don't have one)
keytool -genkeypair -v -keystore release.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000

# Convert keystore to base64
base64 -i release.keystore -o keystore_base64.txt
# Copy content and add as ANDROID_KEYSTORE_BASE64 secret
```

### 3. Firebase App ID

```bash
# Get your Firebase App ID from Firebase Console
# Go to Project Settings → General → Your apps
# Copy the App ID (format: 1:123456789:android:abcd1234)
```

### 4. First Build Setup

After setting up secrets, you need to:

1. **Push to main branch** to trigger the pipeline
2. **Check GitHub Actions** tab for build progress
3. **Verify APK upload** in Firebase Console → App Distribution

## 📱 Pipeline Workflow

```mermaid
graph LR
    A[Push to main] --> B[GitHub Actions]
    B --> C[Install Dependencies]
    C --> D[Expo Prebuild]
    D --> E[Setup Keystore]
    E --> F[Fastlane Build]
    F --> G[Firebase Distribution]
    G --> H[Notify Testers]
```

## 🔧 Pipeline Features

- ✅ **Automated Builds** - Triggered on push to `main`
- ✅ **Secure Signing** - Uses GitHub Secrets for keystore
- ✅ **Firebase Distribution** - Uploads to internal testers
- ✅ **Release Notes** - Auto-generated with build info
- ✅ **Artifact Storage** - APK stored in GitHub for 30 days
- ✅ **Email Notifications** - Testers get notified automatically

## 📁 Generated Files Structure

```
.github/
└── workflows/
    └── android-firebase-distribute.yml    # GitHub Actions workflow

android/
├── fastlane/
│   ├── Fastfile                          # Build and distribution logic
│   └── Pluginfile                        # Fastlane plugins
├── Gemfile                               # Ruby dependencies
└── app/
    └── build.gradle.template             # Signing configuration template
```

## 🔄 Manual Build Commands

For local testing:

```bash
# Install dependencies
cd android && bundle install

# Build release APK only
bundle exec fastlane android build_release

# Build and distribute to Firebase
bundle exec fastlane android distribute
```

## 👥 Managing Test Groups

In Firebase Console → App Distribution:

1. **Create tester groups** (e.g., `internal-testers`, `beta-testers`)
2. **Add testers** by email address
3. **Modify Fastfile** to target different groups

```ruby
# In Fastfile, change the groups parameter:
firebase_app_distribution(
  groups: "internal-testers,beta-testers"  # Multiple groups
)
```

## 🐛 Troubleshooting

### Build Failures

- **Keystore issues**: Verify base64 encoding and secrets
- **Firebase auth**: Check `FIREBASE_TOKEN` validity
- **Gradle errors**: Ensure Android setup in `app.json`

### Distribution Issues

- **App ID mismatch**: Verify `FIREBASE_APP_ID` format
- **Tester groups**: Ensure group exists in Firebase Console
- **Permissions**: Check Firebase project permissions

## 📊 Build Artifacts

Each successful build generates:

- **Signed APK** - Ready for distribution
- **Build logs** - Available in GitHub Actions
- **Firebase release** - Visible in App Distribution
- **Tester notifications** - Sent automatically

## 🚀 Next Steps

1. **Set up all secrets** in GitHub repository
2. **Push to main** to trigger first build
3. **Add testers** to Firebase App Distribution
4. **Monitor builds** in GitHub Actions tab
5. **Customize** Fastfile for your specific needs

---

🎯 **Result**: Automated pipeline from code commit to Firebase distribution in minutes!

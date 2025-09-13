# 🚀 Elloo App - Fastlane Automation Setup Guide

Your Firebase project is configured! Follow these steps to complete the automation setup.

## ✅ Already Completed
- ✅ Firebase project created (`elloo-dc638`)
- ✅ Android app added to Firebase
- ✅ `google-services.json` configured
- ✅ Firebase App ID: `1:772875865340:android:c23bf5e2b5ec03e2305b79`
- ✅ All CI/CD files created

## 🎯 Next Steps (Execute in Order)

### Step 1: Setup Firebase CLI & Get Auth Token

```bash
yarn setup-firebase
```

This will:
- Install Firebase CLI (if needed)
- Authenticate with your Firebase account
- Generate authentication token for CI/CD
- Create `firebase-token.txt` with your token

**Copy the token** from the output or `firebase-token.txt` file.

### Step 2: Generate Android Release Keystore

```bash
yarn generate-keystore
```

This will:
- Create a release keystore for app signing
- Generate base64 encoded keystore
- Create `keystore-base64.txt` 
- Show all the GitHub Secrets you need

**Recommended keystore details:**
- Key alias: `elloo-release`
- Organization: `Syntaxel`
- App: `Elloo App`

### Step 3: Configure GitHub Secrets

Go to your GitHub repository: **Settings → Secrets and variables → Actions**

Add these 6 secrets:

| Secret Name | Value | Source |
|-------------|-------|--------|
| `FIREBASE_TOKEN` | `1//0abcd...xyz` | From Step 1 output |
| `FIREBASE_APP_ID` | `1:772875865340:android:c23bf5e2b5ec03e2305b79` | Already configured |
| `ANDROID_KEYSTORE_BASE64` | `MIIEvgIBADANBgkq...` | From `keystore-base64.txt` |
| `KEYSTORE_PASSWORD` | Your keystore password | From Step 2 |
| `KEY_ALIAS` | `elloo-release` | From Step 2 |
| `KEY_PASSWORD` | Your key password | From Step 2 |

### Step 4: Setup Firebase App Distribution Testers

1. Go to [Firebase Console](https://console.firebase.google.com/project/elloo-dc638/appdistribution)
2. Click **"Testers & Groups"** tab
3. **Create a group** named: `internal-testers`
4. **Add testers** by email addresses
5. **Save** the group

### Step 5: Test the Pipeline

```bash
# First, verify setup
yarn setup-cicd

# Then push to main branch to trigger build
git add .
git commit -m "feat: setup CI/CD pipeline with Fastlane and Firebase"
git push origin main
```

## 🔄 Pipeline Process

Once you push to `main`:

1. **GitHub Actions** triggers automatically
2. **Dependencies** installed (Node.js, Android SDK, Ruby)
3. **Expo prebuild** generates Android project
4. **Keystore** created from secrets
5. **Fastlane** builds signed APK
6. **Firebase** distributes to `internal-testers` group
7. **Testers** receive email notifications

## 📱 Expected Timeline

- **Total build time**: ~10-15 minutes
- **Notification emails**: Sent automatically to testers
- **APK availability**: Immediate in Firebase App Distribution

## 🔍 Monitoring

- **Build progress**: GitHub Actions tab
- **Logs**: Available in Actions workflow
- **Distribution**: Firebase Console → App Distribution
- **Downloads**: Testers can download from email links

## 🛠 Manual Commands (for testing)

```bash
# Install Fastlane dependencies
cd android && bundle install

# Build APK only
bundle exec fastlane android build_release

# Build and distribute
bundle exec fastlane android distribute

# Run tests
bundle exec fastlane android test
```

## 📋 Verification Checklist

- [ ] Firebase CLI token obtained
- [ ] Android keystore generated
- [ ] All 6 GitHub Secrets added
- [ ] `internal-testers` group created in Firebase
- [ ] Testers added to the group
- [ ] First build triggered by pushing to main

## 🚨 Important Security Notes

1. **Delete sensitive files** after adding to GitHub:
   - `firebase-token.txt`
   - `keystore-base64.txt`
   - `release.keystore` (keep backed up securely)

2. **Never commit** these to your repository:
   - Keystore files
   - Token files
   - Keystore passwords

3. **Keep keystore backed up** - you'll need it for production releases

## 🎉 Success Indicators

✅ **GitHub Actions** builds without errors  
✅ **APK generated** and uploaded to Firebase  
✅ **Testers receive** email notifications  
✅ **Testers can download** and install the APK  

## 🔧 Troubleshooting

### Build Fails
- Check GitHub Secrets are correct
- Verify keystore base64 encoding
- Ensure Firebase project permissions

### Distribution Fails
- Verify Firebase App ID matches
- Check tester group exists
- Confirm Firebase token is valid

### No Notifications
- Check tester email addresses
- Verify group assignment
- Test Firebase Console access

---

🎯 **Ready to automate your builds?** Start with Step 1! 🚀

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Elloo App CI/CD Setup Helper\n');

// Check if running in project root
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Error: Please run this script from the project root directory');
  process.exit(1);
}

// Check app.json for Android configuration
const appJsonPath = path.join(process.cwd(), 'app.json');
if (fs.existsSync(appJsonPath)) {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  
  console.log('📱 Checking Expo configuration...');
  
  if (!appJson.expo?.android?.package) {
    console.log('⚠️  Warning: No Android package configured in app.json');
    console.log('   Add: "android": { "package": "com.ellooapp" }');
  } else {
    console.log(`✅ Android package: ${appJson.expo.android.package}`);
  }
  
  if (!appJson.expo?.version) {
    console.log('⚠️  Warning: No version configured in app.json');
  } else {
    console.log(`✅ App version: ${appJson.expo.version}`);
  }
}

// Check for required files
const requiredFiles = [
  '.github/workflows/android-firebase-distribute.yml',
  'android/fastlane/Fastfile',
  'android/Gemfile',
  '.firebaserc',
  'firebase.json'
];

console.log('\n📋 Checking CI/CD files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - Missing!`);
  }
});

// Secrets checklist
console.log('\n🔑 Required GitHub Secrets:');
const secrets = [
  'FIREBASE_TOKEN',
  'FIREBASE_APP_ID', 
  'ANDROID_KEYSTORE_BASE64',
  'KEYSTORE_PASSWORD',
  'KEY_ALIAS',
  'KEY_PASSWORD'
];

secrets.forEach(secret => {
  console.log(`   - ${secret}`);
});

console.log('\n📖 Next Steps:');
console.log('1. Set up Firebase project and get App ID');
console.log('2. Generate Android release keystore');
console.log('3. Add all required secrets to GitHub repository');
console.log('4. Push to main branch to trigger first build');
console.log('\n📚 See CI_CD_SETUP.md for detailed instructions');

// Check if android directory exists
if (!fs.existsSync(path.join(process.cwd(), 'android'))) {
  console.log('\n⚠️  Note: Android directory not found.');
  console.log('   Run "expo prebuild --platform android" to generate it.');
}

console.log('\n🎯 Ready for automated builds and Firebase distribution!');

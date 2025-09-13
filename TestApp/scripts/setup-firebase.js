#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');

console.log('🔥 Firebase CLI Setup for CI/CD\n');

// Check if Firebase CLI is installed
function checkFirebaseCLI() {
  try {
    execSync('firebase --version', { stdio: 'ignore' });
    console.log('✅ Firebase CLI is installed');
    return true;
  } catch (error) {
    console.log('❌ Firebase CLI not found');
    return false;
  }
}

// Install Firebase CLI
function installFirebaseCLI() {
  console.log('📦 Installing Firebase CLI...');
  try {
    execSync('npm install -g firebase-tools', { stdio: 'inherit' });
    console.log('✅ Firebase CLI installed successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to install Firebase CLI:', error.message);
    return false;
  }
}

// Get Firebase auth token
function getFirebaseToken() {
  console.log('\n🔐 Getting Firebase authentication token...');
  console.log('ℹ️  This will open your browser for authentication');
  console.log('⏳ Please complete the authentication in your browser...\n');
  
  try {
    const result = execSync('firebase login:ci', { encoding: 'utf8', stdio: 'pipe' });
    
    // Extract token from output
    const tokenMatch = result.match(/1\/\/[^\s]+/);
    if (tokenMatch) {
      const token = tokenMatch[0];
      console.log('✅ Authentication successful!');
      console.log('\n🔑 Your Firebase Token:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(token);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n📋 Add this as FIREBASE_TOKEN secret in GitHub');
      
      // Save to file for easy copying
      fs.writeFileSync('firebase-token.txt', token);
      console.log('💾 Token also saved to firebase-token.txt');
      
      return token;
    } else {
      console.log('❌ Could not extract token from Firebase CLI output');
      return null;
    }
  } catch (error) {
    console.error('❌ Firebase authentication failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   - Make sure you have access to the Firebase project');
    console.log('   - Try running: firebase logout && firebase login:ci');
    return null;
  }
}

// Create tester groups in Firebase
function setupTesterGroups() {
  console.log('\n👥 Setting up tester groups...');
  console.log('ℹ️  You can create tester groups in Firebase Console:');
  console.log('   1. Go to Firebase Console → App Distribution');
  console.log('   2. Click "Testers & Groups" tab');
  console.log('   3. Create group: "internal-testers"');
  console.log('   4. Add tester email addresses');
  console.log('\n🔗 Direct link: https://console.firebase.google.com/project/elloo-dc638/appdistribution');
}

// Main execution
async function main() {
  let hasFirebaseCLI = checkFirebaseCLI();
  
  if (!hasFirebaseCLI) {
    const installed = installFirebaseCLI();
    if (!installed) {
      console.log('\n💡 Manual installation:');
      console.log('   npm install -g firebase-tools');
      process.exit(1);
    }
  }
  
  const token = getFirebaseToken();
  
  if (token) {
    setupTesterGroups();
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Add FIREBASE_TOKEN to GitHub Secrets');
    console.log('2. Generate Android keystore: yarn generate-keystore');
    console.log('3. Add all secrets to GitHub repository');
    console.log('4. Push to main branch to trigger build');
    
    console.log('\n⚠️  Security Notes:');
    console.log('   - Delete firebase-token.txt after copying to GitHub');
    console.log('   - Keep your Firebase token secure');
    console.log('   - Never commit tokens to your repository');
  } else {
    console.log('\n❌ Firebase setup incomplete');
    console.log('💡 Try running the script again or set up manually');
  }
}

main().catch(console.error);

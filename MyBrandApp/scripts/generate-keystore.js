#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function generateKeystore() {
  console.log('🔑 Android Release Keystore Generator\n');
  
  // Get keystore details
  const alias = await question('Enter key alias (e.g., elloo-release): ') || 'elloo-release';
  const keystorePassword = await question('Enter keystore password: ');
  const keyPassword = await question('Enter key password (or press Enter to use same as keystore): ') || keystorePassword;
  
  console.log('\nℹ️  Certificate details:');
  const cn = await question('Your name (CN): ') || 'Elloo App';
  const ou = await question('Organizational unit (OU): ') || 'Development';
  const o = await question('Organization (O): ') || 'Syntaxel';
  const l = await question('City (L): ') || 'Unknown';
  const st = await question('State (ST): ') || 'Unknown';
  const c = await question('Country code (C, 2 letters): ') || 'US';
  
  const dname = `CN=${cn}, OU=${ou}, O=${o}, L=${l}, ST=${st}, C=${c}`;
  
  console.log('\n🔨 Generating keystore...');
  
  const keystorePath = path.join(process.cwd(), 'release.keystore');
  
  try {
    const command = `keytool -genkeypair -v -keystore "${keystorePath}" -alias "${alias}" -keyalg RSA -keysize 2048 -validity 10000 -storepass "${keystorePassword}" -keypass "${keyPassword}" -dname "${dname}"`;
    
    execSync(command, { stdio: 'inherit' });
    
    console.log('\n✅ Keystore generated successfully!');
    console.log(`📍 Location: ${keystorePath}`);
    
    // Generate base64 for GitHub Secrets
    console.log('\n🔄 Converting to base64 for GitHub Secrets...');
    const keystoreBuffer = fs.readFileSync(keystorePath);
    const base64Keystore = keystoreBuffer.toString('base64');
    
    const base64File = path.join(process.cwd(), 'keystore-base64.txt');
    fs.writeFileSync(base64File, base64Keystore);
    
    console.log(`✅ Base64 saved to: ${base64File}`);
    
    // Show secrets summary
    console.log('\n🔑 GitHub Secrets to add:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`KEYSTORE_PASSWORD: ${keystorePassword}`);
    console.log(`KEY_ALIAS: ${alias}`);
    console.log(`KEY_PASSWORD: ${keyPassword}`);
    console.log(`ANDROID_KEYSTORE_BASE64: [Copy from ${base64File}]`);
    console.log(`FIREBASE_APP_ID: 1:772875865340:android:c23bf5e2b5ec03e2305b79`);
    console.log('FIREBASE_TOKEN: [Get from: firebase login:ci]');
    
    console.log('\n⚠️  IMPORTANT:');
    console.log('- Keep release.keystore file secure and backed up');
    console.log('- Add keystore-base64.txt content to ANDROID_KEYSTORE_BASE64 secret');
    console.log('- Delete keystore-base64.txt after copying to GitHub');
    
  } catch (error) {
    console.error('❌ Error generating keystore:', error.message);
    console.log('\n💡 Make sure you have Java keytool installed');
    console.log('   Download from: https://adoptium.net/');
  }
  
  rl.close();
}

// Check if keytool is available
try {
  execSync('keytool -help', { stdio: 'ignore' });
  generateKeystore();
} catch (error) {
  console.error('❌ keytool not found in PATH');
  console.log('💡 Please install Java JDK to use keytool');
  console.log('   Download from: https://adoptium.net/');
  process.exit(1);
}

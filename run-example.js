#!/usr/bin/env node

// Example usage script for create-myapp CLI

console.log('🚀 create-myapp CLI Tool Examples\n');

console.log('1. Create new project from Elloo template:');
console.log('   node lib/cli.js MyApp --template ../Elloo-app-frontend\n');

console.log('2. Update colors in existing project:');  
console.log('   node lib/cli.js MyApp --colors ./test-colors.js\n');

console.log('3. Update fonts in existing project:');
console.log('   node lib/cli.js MyApp --fonts ./test-fonts.js\n');

console.log('4. Update assets in existing project:');
console.log('   node lib/cli.js MyApp --assets ./test-assets\n');

console.log('5. Update multiple components:');
console.log('   node lib/cli.js MyApp --colors ./test-colors.js --fonts ./test-fonts.js\n');

console.log('6. Interactive mode:');
console.log('   node lib/cli.js --interactive\n');

console.log('✅ CLI tool successfully created and tested!');
console.log('📁 The tool can now analyze and update Elloo-based React Native apps');

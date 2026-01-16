const fs = require('fs');
const path = require('path');

// Copy .htaccess to out directory after build
const htaccessSource = path.join(__dirname, '.htaccess');
const htaccessDest = path.join(__dirname, 'out', '.htaccess');

if (fs.existsSync(htaccessSource)) {
  fs.copyFileSync(htaccessSource, htaccessDest);
  console.log('✓ .htaccess copied to out directory');
} else {
  console.warn('⚠ .htaccess file not found');
}

// Verify out directory contents
if (fs.existsSync('out')) {
  console.log('✓ out directory exists');
  const files = fs.readdirSync('out');
  console.log('Files in out directory:');
  files.forEach(file => console.log('  -', file));
}

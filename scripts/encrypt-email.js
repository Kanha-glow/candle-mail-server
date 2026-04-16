const crypto = require('crypto');

// AES key must be provided via environment variable `EMAIL_AES_KEY_HEX` (32-byte hex)
const keyHex = process.env.EMAIL_AES_KEY_HEX;
if (!keyHex) {
  console.error('ERROR: EMAIL_AES_KEY_HEX environment variable is not set.');
  console.error('Set EMAIL_AES_KEY_HEX in your environment or in a local .env file (which should NOT be committed).');
  process.exit(1);
}
const key = Buffer.from(keyHex, 'hex');

function encryptEmail(email) {
  const iv = crypto.randomBytes(12); // 96-bit IV for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  let encrypted = Buffer.concat([
    cipher.update(email, 'utf8'),
    cipher.final()
  ]);
  
  const authTag = cipher.getAuthTag();
  
  // Format: iv + encrypted + authTag
  const result = Buffer.concat([iv, encrypted, authTag]);
  return result.toString('hex');
}

// Get email from command line argument or environment
const developerEmail = process.argv[2] || process.env.DEV_EMAIL || 'your-email@gmail.com';

if (developerEmail === 'your-email@gmail.com') {
  console.log('Usage: node encrypt-email.js <your-email@gmail.com>');
  console.log('Or set DEV_EMAIL environment variable');
  process.exit(1);
}
const encryptedEmail = encryptEmail(developerEmail);

console.log('Encrypted email for .env.local:');
console.log('DEV_EMAIL_ENCRYPTED=' + encryptedEmail);
console.log('\nNext steps:');
console.log('1. Replace DEV_EMAIL_ENCRYPTED in backend/.env.local with the value above');
console.log('2. Set up Gmail App Password:');
console.log('   - Go to Google Account settings');
console.log('   - Enable 2-factor authentication');
console.log('   - Generate an App Password for "Mail"');
console.log('   - Replace SMTP_PASS in backend/.env.local with the app password');
console.log('3. Restart the backend server');

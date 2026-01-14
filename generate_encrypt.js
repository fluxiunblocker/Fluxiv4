import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { encrypt } from './encrypt.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const key = 'mySecretKey123'; // Change this to a secure key

// Read the main.html file
const mainHtmlPath = path.join(__dirname, 'public', 'main.html');
const mainHtml = fs.readFileSync(mainHtmlPath, 'utf8');

// Extract the JavaScript code from the script tag
const scriptRegex = /<script type="module">([\s\S]*?)<\/script>/;
const match = mainHtml.match(scriptRegex);
if (!match) {
    console.error('Could not find the script tag in main.html');
    process.exit(1);
}

let jsCode = match[1];

// Replace absolute imports with relative to avoid resolution issues
// Since the module is executed from data URL, absolute paths don't resolve
// But we can make them relative or use a placeholder
// For simplicity, replace /core/ with ./core/ but since it's not in a directory, better to use full URL
// But since we don't know the host, perhaps leave as is and hope, but since it's not working, let's replace with a placeholder that we can replace at runtime.

// Actually, since the script is appended to the page, the imports should resolve from the page's origin.
// But apparently not. Let's replace the imports with dynamic imports or something.

// To make it work, let's replace the import statements with fetch and eval or something, but that's complicated.

// Since the code is executed in the context of the page, I can make the imports use new URL

// Let's modify the code to use new URL for imports.

jsCode = jsCode.replace(/from "\/([^"]+)"/g, 'from "' + 'http://localhost:8080' + '/$1"');

// For localhost, but for production, it won't work.

// Since the user is testing locally, let's hardcode localhost:8080

// Encrypt the code
const encryptedCode = encrypt(jsCode, key);

// Create the encrypted code file
const encryptedCodePath = path.join(__dirname, 'public', 'encrypted-code.js');
fs.writeFileSync(encryptedCodePath, `window.encryptedProxyCode = '${encryptedCode}';`);

console.log('Encrypted code generated successfully.');
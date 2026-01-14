// Browser-side decryption function
function decrypt(encrypted, key) {
    const decoded = atob(encrypted); // Base64 decode
    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
        decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return decrypted;
}

const key = 'mySecretKey123';

// Function to load and decrypt the code
async function loadEncryptedCode() {
    const response = await fetch('/encrypted-code.js');
    const script = await response.text();
    eval(script); // This sets window.encryptedProxyCode

    const decryptedCode = decrypt(window.encryptedProxyCode, key);
    eval(decryptedCode);
}

// Call this to load the encrypted code
loadEncryptedCode();
export function encrypt(text, key) {
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
        encrypted += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(encrypted); // Base64 encode
}

export function decrypt(encrypted, key) {
    const decoded = atob(encrypted); // Base64 decode
    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
        decrypted += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return decrypted;
}
export function validateEmail(email) { 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

export function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

export function isForbiddenText(text) {
    const forbiddenWords = ["admin", "root", "superuser"];
    const lowerCaseText = text.toLowerCase();
    return forbiddenWords.some(word => lowerCaseText.includes(word));
}

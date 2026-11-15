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
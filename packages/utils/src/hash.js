import argon2 from "argon2";

export function makeHash(input) {
    return argon2.hash(input);
}

export function verifyHash(hash, input) {
    return argon2.verify(hash, input);
}

export function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
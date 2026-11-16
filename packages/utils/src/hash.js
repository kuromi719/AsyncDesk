import argon2 from "argon2";
import { createHash, randomBytes } from "node:crypto";

export function makeHash(input) {
    return argon2.hash(input);
}

export function verifyHash(hash, input) {
    return argon2.verify(hash, input);
}

export function generateRandomString(length) {
    return randomBytes(length).toString("base64url").slice(0, length);
}

export function generateSessionToken() {
    return randomBytes(48).toString("base64url");
}

export function generateSessionHash(token) {
    return createHash("sha256").update(token).digest("hex");
}

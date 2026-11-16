require("dotenv").config();

const { UserModel } = require("../../packages/models/src/UserModel");
const { SessionModel } = require("../../packages/models/src/SessionModel");
const { Hash } = require("@monorepo/utils");
const db = require("./DBService");

async function getUserByEmail(email) {
  const result = await db.query(
    `
      SELECT id, email, passwordhash, displayname, createdat, updatedat
      FROM users
      WHERE email = $1
    `,
    [email],
  );

  return result.rows[0] || null;
}

async function checkUserPasswordHash(email, password) {
  const user = await getUserByEmail(email);

  if (!user) {
    return false;
  }

  return Hash.verifyHash(user.passwordhash, password);
}

function getUserPublicInfo(user) {
  return user ? UserModel.fromDatabase(user).toPublicJSON() : null;
}

async function createUserSession(userId, userAgent, ipHash) {
  const sessionMinutes = Number(process.env.SESSION_MINUTES);

  if (!Number.isFinite(sessionMinutes) || sessionMinutes <= 0) {
    throw new Error("SESSION_MINUTES must be a positive number");
  }

  const token = Hash.generateSessionToken();
  const tokenHash = Hash.generateSessionHash(token);
  const expiresAt = new Date(Date.now() + sessionMinutes * 60 * 1000);

  const result = await db.query(
    `
      INSERT INTO sessions (userid, tokenhash, expiresat, createdat, useragent, iphash)
      VALUES ($1, $2, $3, NOW(), $4, $5)
      RETURNING id, userid, expiresat, createdat, lastusedat, useragent, iphash
    `,
    [userId, tokenHash, expiresAt, userAgent, ipHash],
  );

  return {
    session: SessionModel.fromDatabase(result.rows[0]).toPublicJSON(),
    token,
  };
}

module.exports = {
  getUserByEmail,
  checkUserPasswordHash,
  getUserPublicInfo,
  createUserSession,
};

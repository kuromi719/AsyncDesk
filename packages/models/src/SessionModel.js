// fields : id UUID , userid , tokenHash , expiresAt , createdAt, lastUsedAt , userAgent , ipHash


class SessionModel {

    constructor({
        id,
        userId,
        tokenHash,
        expiresAt,
        createdAt,
        lastUsedAt,
        userAgent,
        ipHash,
    }) {
        this.id = id;
        this.userId = userId;
        this.tokenHash = tokenHash;
        this.expiresAt = new Date(expiresAt);
        this.createdAt = new Date(createdAt);
        this.lastUsedAt = lastUsedAt ? new Date(lastUsedAt) : null;
        this.userAgent = userAgent;
        this.ipHash = ipHash;
    }

    static fromDatabase(row) {
        return new SessionModel({
        id: row.id,
        userId: row.user_id,
        tokenHash: row.token_hash,
        expiresAt: row.expires_at,
        createdAt: row.created_at,
        lastUsedAt: row.last_used_at,
        userAgent: row.user_agent,
        ipHash: row.ip_hash,
        });
    }

    toPublicJSON() {
        return {
        id: this.id,
        userId: this.userId,
        tokenHash: this.tokenHash,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        };
    }

}

module.exports = {
  SessionModel,
};
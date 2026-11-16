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
        userId: row.userid,
        tokenHash: row.tokenhash,
        expiresAt: row.expiresat,
        createdAt: row.createdat,
        lastUsedAt: row.lastusedat,
        userAgent: row.useragent,
        ipHash: row.iphash,
        });
    }

    toPublicJSON() {
        return {
        id: this.id,
        userId: this.userId,
        expiresAt: this.expiresAt,
        createdAt: this.createdAt,
        lastUsedAt: this.lastUsedAt,
        };
    }

}

module.exports = {
  SessionModel,
};

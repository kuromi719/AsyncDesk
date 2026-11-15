// fields : id , email , passwordHash , displayName , createdAt , updatedAt

class UserModel {
  constructor({
    id,
    email,
    passwordHash,
    displayName,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.displayName = displayName;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  static fromDatabase(row) {
    return new UserModel({
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      displayName: row.display_name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  toPublicJSON() {
    return {
      id: this.id,
      email: this.email,
      displayName: this.displayName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = {
  UserModel,
};
require("dotenv").config();

const db = require("./DBService");


async function getUserByEmail(email) {
    const query = "SELECT email FROM users WHERE email = $1";
    const values = [email];
    const result = await db.query(query, values);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
}

module.exports = {
    getUserByEmail
};

const express = require("express");
const db = require("../DBService");
const pino = require("pino");
const router = express.Router();
const { Validation, Hash } = require("@monorepo/utils");
const dbUtils = require("../DBUtils");

const logger = pino({
    level: process.env.LOG_LEVEL || "info",
});

const logLevel = process.env.LOG_LEVEL

router.post("/", async (req, res) => {

    if (logLevel === "info") {
        logger.info(
        { requestId: req.requestId },
        "User registration requested",
        );
    }
   
    if (!req.body.displayName || !req.body.email || !req.body.password) {
        return res.status(400).json({
            error: "Display name, email, and password are required",
            requestId: req.requestId,
        });
    }

    const userData = {
        displayName: req.body.displayName.trim(),
        email: Validation.normalizeEmail(req.body.email),
        password: req.body.password
    };

    switch (true) {
        case userData.displayName.length < 3:
            return res.status(400).json({
                error: "Display name must be at least 3 characters long",
                requestId: req.requestId,
            });
        case userData.password.length < 8:  
            return res.status(400).json({
                error: "Password must be at least 8 characters long",
                requestId: req.requestId,
            });
        case userData.password.length > 64:
            return res.status(400).json({
                error: "Password must be no more than 64 characters long",
                requestId: req.requestId,
            });
        case userData.displayName.length > 32:
            return res.status(400).json({
                error: "Display name must be no more than 32 characters long",
                requestId: req.requestId,
            });
    }

    if (!Validation.validateEmail(userData.email)) {
        return res.status(400).json({
            error: "Invalid email format",
            requestId: req.requestId,
        });
    }  
  
    if (await dbUtils.getUserByEmail(userData.email)) {
        return res.status(400).json({
            error: "Email is already registered",
            requestId: req.requestId,
        });
    }

    // if validation success preapare for db insert

    const HashedPassword = await Hash.makeHash(req.body.password)

    const insertQuery = `
        INSERT INTO users (email, passwordhash, displayname, createdat, updatedat)
        VALUES ($1, $2, $3, NOW(), NOW())
        RETURNING id, email, displayname, createdat, updatedat;
    `; // disgusting naming..

    const values = [userData.email, HashedPassword, userData.displayName];

    try {
        const result = await db.query(insertQuery, values);

        if (result.rows.length === 0) {
            return res.status(500).json({
                error: "Failed to register user",
                requestId: req.requestId,
            });
        }

        const newUser = result.rows[0];

        if (logLevel === "info") {
            logger.info(
                { requestId: req.requestId, userId: newUser.id },
                "User registered successfully",
            );
        }

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                email: newUser.email,
                displayName: newUser.displayname,
            },
            requestId: req.requestId,
        });

    } catch (error) {
        logger.error(
            { requestId: req.requestId, error: error.message },
            "Database error during user registration",
        );
        return res.status(500).json({
            error: "Database error during user registration",
            requestId: req.requestId,
        });
    }

});


module.exports = router;

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
        "User login requested",
        );
    }

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            error: "Email, and password are required",
            requestId: req.requestId,
        });
    }

    // enough for this day..

});

module.exports = router;
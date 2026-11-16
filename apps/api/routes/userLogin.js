const express = require("express");
const pino = require("pino");
const { Validation } = require("@monorepo/utils");
const dbUtils = require("../DBUtils");

const router = express.Router();
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
});
const logLevel = process.env.LOG_LEVEL;

router.post("/", async (req, res) => {
    try {
        if (logLevel === "info") {
            logger.info({ requestId: req.requestId }, "User login requested");
        }

        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                error: "Email and password are required",
                requestId: req.requestId,
            });
        }

        const email = Validation.normalizeEmail(req.body.email);
        const password = req.body.password;
        const user = await dbUtils.getUserByEmail(email);
        const passwordIsValid = user
        ? await dbUtils.checkUserPasswordHash(email, password)
        : false;

        if (!passwordIsValid) {
            return res.status(401).json({
                error: "Email or password is incorrect",
                requestId: req.requestId,
            });
        }

        const { session, token } = await dbUtils.createUserSession(
            user.id,
            req.headers["user-agent"] || "",
            req.headers["user-ip-hash"] || "",
        );

        if (logLevel === "info") {
            logger.info({ requestId: req.requestId, userId: user.id, sessionId: session.id },
            "User logged in successfully",
        );
        }

        res.cookie("asyncdesk_session", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: Number(process.env.SESSION_MINUTES) * 60 * 1000,
            path: "/",
        });

        return res.status(200).json({
            message: "Login successful",
            user: dbUtils.getUserPublicInfo(user),
            session,
            requestId: req.requestId,
        });
        } catch (error) {
            logger.error({ requestId: req.requestId, error: error.message },
            "Login failed",
        );

        return res.status(500).json({
            error: "Unable to complete login",
            requestId: req.requestId,
        });
    }
});

module.exports = router;

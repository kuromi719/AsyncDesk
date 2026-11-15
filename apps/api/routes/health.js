const express = require("express");
const db = require("../DBService");

const router = express.Router();

router.get("/live", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ message: "OK" , requestId: req.requestId });
  } catch {
    res.status(503).json({ database: "unavailable" });
  }
});

module.exports = router;
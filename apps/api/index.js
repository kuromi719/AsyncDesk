require("dotenv").config();

const express = require("express");
const db = require("./DBService");
const { randomUUID } = require("node:crypto");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "http://localhost:3000", // this stole 30m of my life
}));

app.use(express.json());

app.use((req, res, next) => {
  req.requestId = randomUUID();
  res.setHeader("X-Request-Id", req.requestId);
  res.setHeader("X-API-Version", "1.0");
  /*
  console.log(`Request ID: ${req.requestId} - ${req.method} ${req.url}`);
    api:dev: API listening on http://localhost:4000
    api:dev: PostgreSQL connected and database schema is ready
    api:dev: Request ID: 5ab9a0f9-ab47-43e3-98d4-4b144f62918b - GET /health/live
  **/
  next();
});

// Routes -------------------------

const healthRoutes = require("./routes/health");
const userRegisterRoutes = require("./routes/userRegister");
const userLoginRoutes = require("./routes/userLogin");

app.use("/app/health", healthRoutes);
app.use("/user/register", userRegisterRoutes);
app.use("/user/login", userLoginRoutes);

// ---------------------------------

const pino = require('pino');
const logger = pino();

async function start() {
  try {
    await db.query("SELECT 1");
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      logger.info(`API listening on http://localhost:${port}`);
      logger.info("PostgreSQL connected and database schema is ready");
    });
  } catch (error) {
    logger.error("API could not connect to PostgreSQL:", error.message);
    process.exit(1);
  }
}

start();

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "https://bean-and-brew.netlify.app";
const allowedOrigins = [FRONTEND_ORIGIN, "http://localhost:3000"];

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true); // Postman/curl
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true, // włącz tylko jeśli używasz cookies
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "internal" });
});

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get("/api/db/health", async (_req, res) => {
  try {
    const r = await db.query("SELECT 1 as ok");
    res.json({ ok: r.rows[0].ok === 1 });
  } catch (e) {
    console.error("DB health error:", e);
    res.status(500).json({ ok: false, error: "db_unreachable" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => console.log(`API listening on :${port}`));
process.on("unhandledRejection", (e) => console.error("unhandledRejection:", e));
process.on("uncaughtException", (e) => console.error("uncaughtException:", e));

const express = require("express");
const cors = require("cors");
const config = require("./config");
const { ZodError } = require("zod");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.get("/api", (req, res) => {
  res.json({ message: "Selamat datang di API Calgenius" });
});

const messageController = require("./message/messageController");
app.use("/messages", messageController);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.errors.map(e => ({ path: e.path, message: e.message }))
    });
  }

  // Handle other errors
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Help debugging on Vercel by showing error message
    error: err.message,
    stack: config.nodeEnv === "development" ? err.stack : undefined
  });
});

if (config.nodeEnv !== "production") {
  app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
  });
}

module.exports = app;

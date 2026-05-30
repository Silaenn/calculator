require("dotenv").config();

const config = {
  port: process.env.PORT || 2000,
  nodeEnv: process.env.NODE_ENV || "development",
  email: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
  },
};

// Validate that critical config exists
if (!config.email.user || !config.email.pass) {
  console.warn("WARNING: EMAIL_USER or EMAIL_PASS is not set. Email functionality will fail.");
}

module.exports = config;

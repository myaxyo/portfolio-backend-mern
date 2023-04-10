const apiKeyMiddleware = (req, res, next) => {
  const apiKey = process.env.API_KEY;
  const providedApiKey = req.headers["key-api"];

  if (!providedApiKey || providedApiKey !== apiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

module.exports = apiKeyMiddleware;

const express = require("express");
const cors = require("cors");
const { nanoid } = require("nanoid");
const app = express();
app.use(express.json());
app.use(cors());
const port = 10000;

// Map to store short URLs and corresponding long URLs
const urlMap = {};

app.post("/urlShortner", (req, res) => {
  const longUrl = req.body.longUrl;
  if (!longUrl) {
    return res.status(400).json({ error: "Missing 'longUrl' in request body" });
  }

  // Generate a unique short URL
  const shortUrl = nanoid(6);
  urlMap[shortUrl] = longUrl;

  res.status(200).json({ shortUrl });
});

app.get("/:shortUrl", (req, res) => {
  const shortUrl = req.params.shortUrl;
  const longUrl = urlMap[shortUrl];
  if (!longUrl) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(301, longUrl);
});
console.log(urlMap);
app.listen(port, () => console.log(`Server running on port ${port}`));

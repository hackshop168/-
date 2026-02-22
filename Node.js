// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

const BOT_TOKEN = "8585877951:AAHrNFdoYjttj4B_CZmmvKKIAjwQ-78r_O4";
const CHAT_ID = "-1003786383416";

// เสิร์ฟไฟล์เว็บ
app.use(express.static('public'));

app.get("/log-ip", async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log("Visitor IP:", ip);

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: `Visitor IP: ${ip}` })
  });

  res.send("IP logged!");
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
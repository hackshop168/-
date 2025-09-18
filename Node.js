// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

const BOT_TOKEN = "8068929944:AAHtsM5Yf--VwBDFg3b_paSkXADFRh8kuoo";
const CHAT_ID = "-4898717294";

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
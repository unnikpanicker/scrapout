const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.amazon.in/";

app.get("/", (req, res) => {
  res.json("This is scrapout");
});

app.get("/scrapout", (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const topPicks = [];
      $(".feed-carousel-card", html).each(function () {
        const url = $(this).find("img").attr("src");
        const alt = $(this).find("img").attr("alt");
        topPicks.push({ url, alt });
      });
      res.json(topPicks);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running in port ${PORT}`));

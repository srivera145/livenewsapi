const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = process.env.PORT || 6050;
const app = express();

const news = [
  {
    name: "Google HeadLine News",
    link: "https://news.google.com/home?hl=en-US&gl=US&ceid=US:en",
    base: "https://news.google.com/",
  },
  {
    name: "Google US News",
    link: "https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNRGxqTjNjd0VnSmxiaWdBUAE?hl=en-US&gl=US&ceid=US%3Aen",
    base: "https://news.google.com/",
  },
  {
    name: "Google World News",
    link: "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen",
    base: "https://news.google.com/",
  },
  {
    name: "Google Business News",
    link: "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen",
    base: "https://news.google.com/",
  },
  {
    name: "Google Technology News",
    link: "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen",
    base: "https://news.google.com/",
  },
  {
    name: "Google Entertainment News",
    link: "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen",
    base: "https://news.google.com/",
  },
  {
    name: "Google Sports News",
    link: "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen",
    base: "https://news.google.com/",
  },
  {
    name: "Google Science News",
    link: "https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen",
    base: "https://news.google.com/",
  },
  {
    name: "Google Health News",
    link: "https://news.google.com/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnVLQUFQAQ?hl=en-US&gl=US&ceid=US%3Aen",
    base: "https://news.google.com/",
  },
  {
    name: "The TMZ News",
    link: "https://www.tmz.com",
  },
  {
    name: "The TMZ Sports",
    link: "https://www.tmz.com/sports",
  },
];

const newsArticles = [];

news.forEach((news) => {
  axios.get(news.link).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $("article", html).each(function () {
      const title = $(this).find("h4, h3").text();
      const url = $(this).find("a").attr("href");
      const image = $(this).find("img").attr("src");
      const publishedAt = new Date();
      const author = $(this).find("span").text();
      const source = news.name;

      newsArticles.push({
        source,
        author,
        title,
        image,
        url: news.base + url,
        publishedAt,
      });
    });
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the News API!");
});

app.get("/news", (req, res) => {
  res.json(newsArticles);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

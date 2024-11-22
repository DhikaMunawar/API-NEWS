const express = require('express');
const { fetchNewsData, fetchNewsDetail, parseNewsData } = require('../utils/news');

const router = express.Router();

router.get("/news", async (req, res) => {
    try {
        const htmlData = await fetchNewsData();
        const newsData = parseNewsData(htmlData);
  
      const newsDetailsPromises = newsData.berita.map(async (item) => {
        const detail = await fetchNewsDetail(item.berita_id);
        return { ...item, detail };
      });

      const newsDetails = await Promise.all(newsDetailsPromises);
  
      res.json(newsDetails);
    } catch (error) {
      console.error("Error fetching or parsing news data:", error);
  
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


module.exports = router;
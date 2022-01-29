const express = require('express');
const router = express.Router();
const News = require('../models/news');

/* GET home page. */
router.get('/', (req, res) => {
  const search = req.query.search || '';

  const topNews = News
    .find({ title: new RegExp(search.trim(), 'i') })
    .sort({created: -1});

  topNews.exec((err, data) => {
      res.render('topNews', { title: 'Top News', data, search });
  });
});

module.exports = router;

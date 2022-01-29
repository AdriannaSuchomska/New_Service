const express = require('express');
const { request } = require('../app');
const router = express.Router();
const News = require('../models/news');

/* GET home page. */
router.get('/', (req, res) => {
  const search = req.query.search || '';
  let sort = req.query.sort || -1;

  if (sort !== -1 || sort !== 1 ) {
      sort = -1;
  }

  const topNews = News
    .find({ title: new RegExp(search.trim(), 'i') })
    .sort({created: sort });

  topNews.exec((err, data) => {
      res.json(data);
  });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    const topNews = News
      .findById(id);
  
    topNews.exec((err, data) => {
        res.json(data);
    });
  });

module.exports = router;

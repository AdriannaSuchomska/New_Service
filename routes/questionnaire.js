const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/questionnaire');

/* GET home page. */
router.get('/', (req, res) => {
  const show = !req.session.vote;

  Questionnaire.find({}, (err, data) => {
    let summary = 0;
    data.forEach( (item) => {
      summary += item.vote;
    });
    res.render('questionnaire', { title: 'Ankieta', data, show, summary });
  });
});

router.post('/', (req, res) => {
  const id = req.body.answer;

  Questionnaire.findOne({_id: id}, (err, data) => {
    data.vote = data.vote +1;
    data.save(() => {
      req.session.vote = 1;

      res.redirect('/questionnaire');
    });
  });
});

module.exports = router;

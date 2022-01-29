const express = require('express');
const router = express.Router();

const login = 'admin';
const password = 'admin1234';

/* GET home page. */
router.get('/', (req, res) => {
  res.render('admin', { title: 'Express' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Zaloguj się' });
});

router.post('/login', (req, res) => {
  const body = req.body;

  if(body.login === login && body.password === password) {
    req.session.admin = 1;

    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }

});

module.exports = router;

const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/', (req, res) => {
  console.log(req.session);

  // other logic...
});

router.get('/login', (req, res) => {
  if(req.session.loggedIn) {
    res.redirect('/userpage');
    return;
  }
  res.render('login');
});

router.get('/userpage', (req, res) => {
  res.render('userpage');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
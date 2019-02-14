import passport from 'passport';
import express from 'express';
const router = express.Router();

router.post('/', (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json({ status: 404, message: 'Not found' });
    } else {
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        return res.json({
          status: 200,
          message: 'OK',
          data: {
            user: user
          }
        });
      });
    }
  })(req, res, next);
});

router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/private');
  });

router.get('/twitter',
  passport.authenticate('twitter'));

router.get('/twitter/return',
  passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/private');
  });

router.get('/google',
  passport.authenticate('google',{ scope: ['profile'] }));

router.get('/google/return',
  passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/private');
  });

export default router;

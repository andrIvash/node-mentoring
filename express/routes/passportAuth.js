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
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({
          code: 200,
          message: 'OK',
          data: {
            user: user
          }
        });
      });
    }
  })(req, res, next);
});

export default router;

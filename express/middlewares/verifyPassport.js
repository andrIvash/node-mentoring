const verifyPassport = (req, res, next) => {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send({ message: 'Not authorized.' });
  }
};

export default verifyPassport;

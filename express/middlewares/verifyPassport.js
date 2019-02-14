const verifyPassport = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send({ message: 'Not authorized.' });
  }
};

export default verifyPassport;

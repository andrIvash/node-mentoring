const queryParserMiddleware = function (req, res, next) {
  if (req.query) {
    req.parsedQuery = req.query;
  }
  console.log('Query parsed: ', req.parsedQuery);
  next();
};

export default queryParserMiddleware;

const cookieParserMiddleware = function (req, res, next) {
  if (req.headers.cookie) {
    req.parsedCookies = req.headers.cookie.split(';')
      .reduce((list, cookie) => {
        const parts = cookie.split('=');
        list[parts[0]] = parts[1];
        return list;
      }, {});
  }
  console.log('Cookie parsed: ', req.parsedCookies);
  next();
};

export default cookieParserMiddleware;

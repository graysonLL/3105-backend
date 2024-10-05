const loggingMiddleware = (req, res, next) => {
  const method = req.method;
  const route = req.path || req.url;
  const timeStamp = new Date().toISOString();

  console.log(`[${method}, ${route}, ${timeStamp}]`);

  next();
};

module.exports = loggingMiddleware;

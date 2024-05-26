const rateLimit = require('express-rate-limit');

const rateLimitMiddleware = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: (req, res) => {
    res.status(429).send({
      message: 'Too many requests, please retry after some time',
    });
  },
  headers: true, // Send rate limit headers
  handler: (req, res, next, options) => {
    res.setHeader('Retry-After', Math.ceil(options.windowMs / 1000));
    options.message(req, res);
  },
});

module.exports = rateLimitMiddleware;

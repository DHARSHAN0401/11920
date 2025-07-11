const { Log } = require('./logging');


const SENSITIVE_FIELDS = ['password', 'token', 'auth', 'authorization', 'secret'];

function sanitizeBody(body) {
  if (!body || typeof body !== 'object') return body;
  const sanitized = { ...body };
  SENSITIVE_FIELDS.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });
  return sanitized;
}


function requestLogger(packageName) {
  return async (req, res, next) => {
    try {
      await Log('backend', 'info', packageName, `Request started: ${req.method} ${req.path}`);
      const sanitized = sanitizeBody(req.body);
      await Log('backend', 'debug', packageName, `Request body: ${JSON.stringify(sanitized)}`);
      const originalSend = res.send;
      res.send = async function (body) {
        await Log('backend', 'info', packageName, `Response sent: ${res.statusCode}`);
        return originalSend.call(this, body);
      };
      next();
    } catch (err) {
      await Log('backend', 'error', packageName, `Request error: ${err.message}`);
      next(err);
    }
  };
}

module.exports = requestLogger;

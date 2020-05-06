const { createProxyMiddleware } = require('http-proxy-middleware');

// https://create-react-app.dev/docs/proxying-api-requests-in-development/

module.exports = function (app) {
  app.use(
    ['/signup', '/api', '/auth', '/auth/google'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};
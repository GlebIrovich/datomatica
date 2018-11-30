module.exports = {
  production: {
    basename: '/',
    authUrl: process.env.REACT_APP_AUTH_URL,
    callbackUrl: process.env.REACT_APP_AUTH_URL,
    returnUrl: process.env.REACT_APP_RETURN_URL,
  },
  development: {
    basename: '/datomatica',
    authUrl: process.env.REACT_APP_AUTH_URL || 'http://localhost:5000/',
    returnUrl: 'http://localhost:3000/datomatica/dashboard/',
    callbackUrl: process.env.REACT_APP_AUTH_URL || 'http://localhost:5000/',
  },
}[process.env.NODE_ENV || 'development'];

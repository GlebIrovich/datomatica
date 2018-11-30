module.exports = {
  production: {
    fetcherURL: process.env.FETCHER_URL || 'http://127.0.0.1:8001/',
  },
  development: {
    fetcherURL: process.env.FETCHER_URL || 'http://127.0.0.1:8001/',
  },
}[process.env.NODE_ENV || 'development'];

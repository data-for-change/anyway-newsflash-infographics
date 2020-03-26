const CachingProxy = require('caching-proxy');

const proxy = new CachingProxy({
  port: 9090,
  dir: './cache-proxy/cached-data'
});

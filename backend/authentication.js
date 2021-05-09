var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-0ut-dv2g.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://image-repository/api',
    issuer: 'https://dev-0ut-dv2g.us.auth0.com/',
    algorithms: ['RS256']
});

exports.jwtCheck = jwtCheck;
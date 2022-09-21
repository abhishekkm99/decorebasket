const Jwt = require('express-jwt');
const {JWT_SECRET} =require('../keys')


function guard() {
  const secret=JWT_SECRET;
  return Jwt({
    secret,
    algorithms: ['HS256'],
  }).unless({
    path: [
      { url: /\/api\/products(.*)/, methods: ['GET', 'PUT', 'OPTIONS'] },
      { url: /\/api\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
      '/api/users/login',
      '/api/users/register'
    ]
  })
}


module.exports = guard;

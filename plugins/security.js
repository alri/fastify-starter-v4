//'use strict'
//-- import modules
const fp = require('fastify-plugin'),
      cors = require('@fastify/cors'),
      helmet = require('@fastify/helmet'),
      fastifyAuth = require('@fastify/auth'),
      csp = requiree('/config/csp.js')


/**
 * This plugins is for security ...
 */

module.exports = fp(async function (fastify,opts) {
 //-- register pluginm
 
 //------------------ cors
 const url = process.env.APP_HOST
 fastify.register(cors, { 
    // put your options here
    origin: fastify.env.APP_IP_URL,
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Origin', 
      'X-Requested-With', 
      'Accept', 
      'Content-Type', 
      'Authorization'
  ],
  exposedHeaders: 'Authorization',
  credentials: true,
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  })
 
  //------------------ helmet
  
  fastify.register(helmet,{
    contentSecurityPolicy: false ,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
  
    
    //----------- session auth
    fastify.register(fastifyAuth)

})

//module.exports.autoConfig = { foo: 'bar' }



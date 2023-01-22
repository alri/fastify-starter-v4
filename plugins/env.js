'use strict'

//-- import modules
const fp = require('fastify-plugin')
const fastifyEnv = require('@fastify/env')


const schema = {
  type: 'object',
    properties: {
        APP_PORT: {
              type: 'string',
              default: 3000
            },
            APP_HOST:{
              type:'string',
              default:'localhost'
            },
            APP_URL: {
              type: 'string',
              default: "http://localhost:3000"
            },
            APP_IP: {
              type: 'string',
              default: "127.0.0.1"
            },
            APP_IP_URL: {
              type: 'string',
              default: "http://127.0.0.1:3000"
            },
            APP_ENV: {
              type: 'string',
              default: "development"
            },
            APP_SECRET: {
              type: 'string',
              default: '3@#hglf%&#bvxdg#3@#hglf%&#bvxdg#'
            },
            LOG_LEVEL: {
              type: 'string',
              default: "debug"
            },
            MONGO_HOST: {
              type: 'string',
              default: "localhost"
            },
            MONGO_PORT: {
              type: 'string',
              default: 27017
            },
            MONGO_DB: {
              type: 'string',
              default: "fastifyDB"
            },
            
          }
}

const options = {
  confKey: 'env', // optional, default: 'config'
  schema: schema,
  data: process.env // optional, default: process.env
}

module.exports = fp(async function (fastify,opts) {
 fastify
  .register(fastifyEnv, opts)
  .ready((err) => {
    if (err) console.error(err)
    //console.log(fastify.env) 
})
  
})
module.exports.autoConfig = options

//-- now we can access .env
// fastify.env.APP_HOST
// -- elso we can use dotenv module
// process.env.APP_HOST

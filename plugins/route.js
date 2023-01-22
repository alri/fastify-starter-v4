//'use strict'
//-- import modules
const fp = require('fastify-plugin'),
      AutoLoad = require('@fastify/autoload')


/**
 * This plugins ...
 */

module.exports = fp(async function (fastify,opts) {
 
      //-- register api routes

      //-- register web routes
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, '../routes/web'),
        options: Object.assign({ prefix: '/' })
    })
     
      fastify.register(AutoLoad, {
        dir: path.join(__dirname, '../routes/api'),
        options: Object.assign({ prefix: '/api' })
    })

})

//module.exports.autoConfig = { foo: 'bar' }



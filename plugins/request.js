'use strict'

//-- import modules
const fp = require('fastify-plugin')
const fs = require('fs')
const path = require('path')
const fastifyFlash = require('@fastify/flash')


/**
 * This plugins ...
 *
 *
 */
module.exports = fp(async function (fastify,opts) {
  
    //form
    fastify.register(require('@fastify/formbody'))
    
    //session
    fastify.register(require('@fastify/secure-session'), {
        // the name of the session cookie, defaults to 'session'
        //cookieName: 'sessionId',
        // adapt this to point to the directory where secret-key is located
        key: fs.readFileSync(path.join(__dirname, '../secret-key')),
        cookie: {
            path: '/',
            httpOnly: true,
            secure:false, //true with https
            maxAge:10*60
        },
    })
    
    //session flash
    fastify.register(fastifyFlash)


    // csrf protection
    fastify.register(require('@fastify/csrf-protection'), { sessionPlugin: '@fastify/secure-session' })

    
    //file upload
    fastify.register(require('fastify-file-upload'), {
        limits: { fileSize: 50 * 1024 * 1024 },
    });
    
})

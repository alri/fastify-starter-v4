'use strict'
//-- import modules
const fp = require('fastify-plugin')
const { fastifyAwilixPlugin } = require('@fastify/awilix')


/**
 * This plugins ...
 */

module.exports = fp(async function (fastify,opts) {
 //-- register pluginm
    fastify.register(fastifyAwilixPlugin, { disposeOnClose: true, disposeOnResponse: true })

})

//module.exports.autoConfig = { foo: 'bar' }
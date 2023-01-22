'use strict'
//-- import modules
const fp = require('fastify-plugin')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
 * This plugins ...
 */

module.exports = fp(async function (fastify,opts) {
 //-- register pluginm
 fastify.decorate('prisma',prisma)
 
})

//module.exports.autoConfig = { foo: 'bar' }

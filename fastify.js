'use strict'

require('dotenv').config() //console.log(process.env)
const path = require('path')
const AutoLoad = require('@fastify/autoload')



//##################################################
//########## Starter Config ############
//##################################################
const options={
  disableRequestLogging: true,
  logger: {
          level: process.env.LOG_LEVEL || 'debug',
          file: './storage/logs/error' , 
          transport: {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
        }
}
const fastify = require('fastify')(options)

//-- set require from app
global.requiree = require('app-root-path').require



//##################################################
//########## AutoLoad  Plugins ############
//##################################################
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options:{}
  })

 
//##################################################
//########## Test  Plugins Register ############
//##################################################




module.exports = fastify;


//'use strict'
//-- import modules
const fp = require('fastify-plugin')
const { diContainer } = require('@fastify/awilix')
const { asClass, asFunction, Lifetime } = require('awilix')

const CalculateService =requiree('app/services/CalculateService.js')
const CalculateRepository =requiree('app/repositories/CalculateRepository.js')

/**
 * This plugins ...
 */

module.exports = fp(async function (fastify,opts) {
 //-- register pluginm

 diContainer.register({
    
    //------ OR
    CalculateRepository: asClass(CalculateRepository, {
        lifetime: Lifetime.SINGLETON,
        dispose: (module) => module.dispose(),
      }),

      CalculateService: asFunction(
        ({ CalculateRepository }) => { return new CalculateService({CalculateRepository}) }, {
        lifetime: Lifetime.SCOPED,
        dispose: (module) => module.dispose(),
      }),


      /*------- OR
       /*

       CalculateRepository: asClass(CalculateRepository, {
        lifetime: Lifetime.SINGLETON,
        dispose: (module) => module.dispose(),
      }),

        CalculateService: asClass(CalculateService, {
            lifetime: Lifetime.SINGLETON,
            dispose: (module) => module.dispose(),
        }),
    */


    })
 

})

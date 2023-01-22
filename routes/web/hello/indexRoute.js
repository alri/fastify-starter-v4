//------------------------------------------
//----------- Import Controllers & Models & Hooks
//------------------------------------------
const HomeController = requiree('/app/http/controllers/HomeController');
const testHook = requiree("/app/http/hooks/Test.js")

//-------------------------------------------
//---------- Import Middleware & Validator
//-------------------------------------------

module.exports = function homeRoutes(fastify, opts, done) {

    //----------- Add Hook To All Web Routes
    //fastify.addHook('preHandler', testHook)

    //-------------------------------
    //---------------- Home Routes
    //-------------------------------

    //------------ hello/ is avalable !
    fastify.get('/', async (request, reply) => {
        return { hello: 'world' }
      })

    done()
}

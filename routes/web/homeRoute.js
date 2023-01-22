//------------------------------------------
//----------- Import Controllers & Models & Hooks
//------------------------------------------
const HomeController = requiree('/app/http/controllers/HomeController');
const testHook = requiree("/app/http/hooks/Test.js")
const flashMessage = requiree("/app/http/hooks/session/FlashMessage.js");


//-------------------------------------------
//---------- Import Middleware & Validator
//-------------------------------------------

module.exports = function homeRoutes(fastify, opts, done) {

    //----------- Add Hook To All Web Routes
    fastify.addHook('preHandler', testHook)
    fastify.addHook('preHandler', flashMessage)

    //-------------------------------
    //---------------- Home Routes
    //-------------------------------

    fastify.get('/', HomeController.index),
    fastify.get('/spa', HomeController.spa);

    
    done()
}

//------------------------------------------
//----------- Import Controllers
//------------------------------------------
const UserPrismaController = requiree('/app/http/controllers/UserPrismaController');


//-------------------------------------------
//---------- Import Hooks & Validator
//-------------------------------------------
const sessionAuthCheck = requiree("/app/http/hooks/auth/SessionAuthCheck.js")
const flashMessage = requiree("/app/http/hooks/session/FlashMessage.js");
const userPrismaValidator = requiree("/app/http/validators/UserPrismaValidator.js");




async function userPrismaRoutes(fastify, opts, done) {

    //******************** Register Hooks */
    fastify.addHook('preHandler', flashMessage)

    //-------------------------------
    //---------------- User Routes
    //-------------------------------

    fastify.get('/user/signin', UserPrismaController.signinForm)
    const signinOptions = {
        //onRequest:testMiddle,
        preHandler:fastify.csrfProtection,
        preValidation: userPrismaValidator.signin,
    }
    fastify.post('/user/signin', signinOptions, UserPrismaController.signinSubmit);


    fastify.get('/user/signup', UserPrismaController.signupForm);
    const signupOptions = {
        //onRequest:testMiddle,
        preHandler:fastify.csrfProtection,
        preValidation: userPrismaValidator.signup,
    }
    fastify.post('/user/signup', signupOptions, UserPrismaController.signupSubmit);


    const panelOptions = {
        onRequest: sessionAuthCheck,
    }
    fastify.get('/user/panel', panelOptions, UserPrismaController.panel)


    fastify.get('/user/signout', UserPrismaController.signout);


    done()
}

module.exports = userPrismaRoutes
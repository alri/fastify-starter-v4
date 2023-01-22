//------------------------------------------
//----------- Import Controllers
//------------------------------------------
const UserController = requiree('/app/http/controllers/UserController');


//-------------------------------------------
//---------- Import Hooks & Validator
//-------------------------------------------
const sessionAuthCheck = requiree("/app/http/hooks/auth/SessionAuthCheck.js")
const flashMessage = requiree("/app/http/hooks/session/FlashMessage.js");
const userValidator = requiree("/app/http/validators/UserValidator.js");




async function userRoutes(fastify, opts, done) {

    //******************** Register Hooks */
    fastify.addHook('preHandler', flashMessage)

    //-------------------------------
    //---------------- User Routes
    //-------------------------------

    fastify.get('/signin', UserController.signinForm)
    const signinOptions = {
        //onRequest:testMiddle,
        preHandler:fastify.csrfProtection,
        preValidation: userValidator.signin,
    }
    fastify.post('/signin', signinOptions, UserController.signinSubmit);


    fastify.get('/signup', UserController.signupForm);
    const signupOptions = {
        //onRequest:testMiddle,
        preHandler:fastify.csrfProtection,
        preValidation: userValidator.signup,
    }
    fastify.post('/signup', signupOptions, UserController.signupSubmit);


    const panelOptions = {
        onRequest: sessionAuthCheck,
    }
    fastify.get('/panel', panelOptions, UserController.panel)


    fastify.get('/signout', UserController.signout);


    done()
}

module.exports = userRoutes
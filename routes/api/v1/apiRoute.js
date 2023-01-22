'use strict'
//------------------------------------------
//----------- Import Controllers & Models
//------------------------------------------

const UserController = requiree('/app/api/controllers/UserController');
const UserPrismaController = requiree('/app/api/controllers/UserPrismaController');

const TodoController = requiree('/app/api/controllers/TodoController');


//-------------------------------------------
//---------- Import Hook & Validator
//-------------------------------------------
const TokenAuthCheck=requiree('/app/api/hooks/auth/TokenAuthCheck');
const UserValidator= requiree('/app/api/validators/UserValidator')
const TodoValidator= requiree('/app/api/validators/TodoValidator')


//####################################
//####################################
//############ Begin Route    ########
//####################################
//####################################
module.exports = function homeRoutes(fastify, opts, done) {

    //----------- Add Hook To All Web Routes
    //fastify.addHook('preHandler', testHook)

    
     //-----------------------------------------------------
    //---------------- User Routes
    //-----------------------------------------------------
  
    const loginOptions={
        preValidation:UserValidator.signin
    }

    const panelOptions={
        preValidation:TokenAuthCheck
    }
    //--mongose
    fastify.post('/login',loginOptions,UserController.loginSubmit);
    fastify.get('/panel',loginOptions,UserController.panel)

    //--prisma
    fastify.post('/user/login',loginOptions,UserPrismaController.loginSubmit);
    fastify.get('/user/panel',panelOptions,UserPrismaController.panel)


    //-----------------------------------------------------
    //---------------- Todo Routes
    //-----------------------------------------------------
    fastify.get('/todo/create', TodoController.create); //for genetare form csrf
    
    const todoCreateOptions={
        preHandler:fastify.csrfProtection,
        preValidation:TodoValidator.create,
    }
    fastify.post('/todo/create',todoCreateOptions, TodoController.createSubmit);

    fastify.get('/todo/update',TodoController.update); //for genetare form csrf
    const todoUpdateOptions={
        preValidation:TodoValidator.update,
    }
    fastify.post('/todo/update',todoUpdateOptions, TodoController.updateSubmit);

    fastify.get('/todo/read', TodoController.read);

    fastify.post('/todo/delete/:id', TodoController.delSubmit);

    done()
}

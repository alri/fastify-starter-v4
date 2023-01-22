//------------------------------------------
//----------- Import Controllers & Models & Hooks
//------------------------------------------
const TestController = requiree('/app/http/controllers/Tests/TestController');
const SessionController = requiree('/app/http/controllers/Tests/SessionController.js');
const MongoseController = requiree('/app/http/controllers/Tests/MongoseController.js');
const ClassController = requiree('/app/http/controllers/Tests/ClassController.js');
const PrismaController = requiree('/app/http/controllers/Tests/PrismaController.js');
const ServiceContainerController = requiree('/app/http/controllers/Tests/ServiceContainerController.js');


const testHook = requiree("/app/http/hooks/Test.js")

//-------------------------------------------
//---------- Import Middleware & Validator
//-------------------------------------------

module.exports = function homeRoutes(fastify, opts, done) {

    //----------- Add Hook To All Web Routes
    //fastify.addHook('preHandler', testHook)

   //-------------------------------
    //---------------- Test Routes
    //-------------------------------
    fastify.get('/', async function (request, reply) {
      return {
          hello: 'hello test world'
      }
  }),


//-----------  Mongo DB 
fastify.get('/db/insert', MongoseController.dbInsert);
fastify.get('/db/read', MongoseController.dbRead);
fastify.get('/db/read/all', MongoseController.dbReadAll);
fastify.get('/db/update', MongoseController.dbUpdate);
fastify.get('/db/delete', MongoseController.dbDelete);

//-----------test api with class base controller and reposotory
fastify.get('/api/sample/get/all', ClassController.apiGetAllSamples);
fastify.get('/api/sample/get/:sampleId', ClassController.apiGetSampleById);


//-----------  Prisma
fastify.get('/prisma', PrismaController.index);
fastify.get('/prisma/insert', PrismaController.insert);
fastify.get('/prisma/insert/multiple', PrismaController.insertMutiple);
fastify.get('/prisma/insert/relation', PrismaController.insertRelation);
fastify.get('/prisma/read', PrismaController.read);
fastify.get('/prisma/read/all', PrismaController.readAll);
fastify.get('/prisma/read/relation', PrismaController.readRelation);
fastify.get('/prisma/update', PrismaController.update);
fastify.get('/prisma/delete', PrismaController.deletee);

fastify.get('/prisma/article/insert', PrismaController.articleInsert);
fastify.get('/prisma/article/insert/error', PrismaController.articleInsertError);



//------------ Session FlashSession
fastify.get('/session/set', SessionController.setSession);
fastify.get('/session/get', SessionController.getSession);
fastify.get('/flash/set', SessionController.setFlash);
fastify.get('/flash/get', SessionController.getFlash);

//------------ Test Service Container
fastify.get('/container', ServiceContainerController.index);
ServiceContainerController

    done()
}

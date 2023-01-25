//-----------------------------------------
//-----------------------------------------
//------------- HTTP HomeController
//------------------------------------------
//-----------------------------------------


//--------------------------
//------- import Libs & Models
//--------------------------


//--------------------------------------
//----------- Home Controller Functions
//---------------------------------------

function index(request,reply)
{
    let data={
        'mongo':'MongoDB',
        'fastify':'Fatify',
        'vue':'VueJS',
        'node':'NodeJS'
    }

    return reply.view('index.njk',data);
}

function spa(request,reply)
{
    return reply.sendFile('index.html'); //or index.html in public folder
    return reply.view('spa/app.njk'); //or app.njk in resources/views/spa folder  
}

function test(request,reply)
{
   return reply.send("test");
}

function checkLogin(req,reply)
{
   return reply.send("test");
}

//---------------------------- Export Controller
module.exports={
    index,
    spa,
    test,
    checkLogin
}
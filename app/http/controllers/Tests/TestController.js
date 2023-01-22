//------------------------------------------
//------------------------------------------
//----------------- Test Controller
//------------------------------------------
//------------------------------------------

async function index(req,reply){
    return reply.send({message:'test controller'})
}



//---------------------------- Export Controller
module.exports = {
    index,
}
 

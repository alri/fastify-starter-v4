//------------------------------------------
//------------------------------------------
//----------------- Test ServiceContainer
//------------------------------------------
//------------------------------------------

async function index(req,reply){
    const calculate = req.diScope.resolve('CalculateService')
    let sum =calculate.sum(5,6)
    let double=calculate.double(50)
    return reply.send({'sum 5 , 6 is:':sum,'double 50 is':double})
}



//---------------------------- Export Controller
module.exports = {
    index,
}
 
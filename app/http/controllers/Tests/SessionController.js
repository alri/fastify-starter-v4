//------------------------------------------
//------------------------------------------
//----------------- Session & Flash Message
//------------------------------------------
//------------------------------------------
async function setSession(request,reply){
    request.session.set('user',{username:'alireza',password:'58300'})
    return "User Session Is Set"
} 

async function getSession(request,reply){

    return {
        'msg':"cookie is live",
        'user':request.session.get('user'),
    }
    
} 

async function setFlash(req,reply){
    req.flash('info', 'Welcome back Message')
    return {
        'msg':"flash messageis set",
    }

    //or
    //reply.redirect('/test/flash/get')

}
async function getFlash(req,reply){
        //or
    
            const flash=reply.flash('info')
            if(flash.length!=''){
                return flash
            }else{
                return "Flash Message Not Exist !"
            }
        
        //or
        //reply.view('test/flash.njk');
 
}




//---------------------------- Export Controller
module.exports = {
    setFlash,
    getFlash,
    setSession,
    getSession,
}
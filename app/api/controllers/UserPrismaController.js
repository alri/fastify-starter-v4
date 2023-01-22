//-----------------------------------------
//-----------------------------------------
//------------- API User Controller
//------------------------------------------
//-----------------------------------------



//-------------- import lib & middleware
const  jwt  =  require('jsonwebtoken');
const bcrypt = require('bcrypt');




//--------------------------------------
//----------- User api Controller Functions
//---------------------------------------


async function loginSubmit(req,reply){
   
        
     const formUsername=req.body.formUsername;
     const formPassword=req.body.formPassword;
     const formApiKey=req.body.formApiKey;

     
    try{
        //-- check existuser
        const user = await req.server.prisma.user.findFirst({
            where: {
              AND:[
              {username: formUsername},
              {apiKey:formApiKey}
            ]
          },
        })

       
  
    if(user)
    {
    
      //--- now check password
      let match = await bcrypt.compare(formPassword, user.password)
          
        if (match) {

           //----- user have permision and create token
            const  expiresIn  =  5  *  60;
            const  accessToken  =  jwt.sign({ id: user.id,username:user.username }, process.env.APP_SECRET, {
                    expiresIn:  expiresIn
            });
            //---send token
            const response = {
                    "message":" authentication is true !",
                    "status": "success",
                    "apiToken": accessToken,
                    "expire in minute":expiresIn/60
            }
            reply.code(200)
            reply.send(response);
          
        } else {
          // create error
           const response = {
                "message":"Your password is not correct !",
                "status": "error",
                "token": '',
                'expire':''
                }
            reply.code(401)
            reply.send(response);
            }
        
    }

    else if(!user)
    {
        const response = {
                "message":"User or Key not found !",
                "status": "error",
                "token": '',
                "expire":'',
                }
            reply.code(401)
            reply.send(response);
    }

}
  catch(err) {
   //reply.send(err)
     //console.log(err)
     const response = {
                "message":err.message,
                "status": "error",
                "token": '',
                'expire':'',
                }
            reply.code(500)
            reply.send(response);
}

}


function logOut(req, reply) {
  reply.code(200)
  reply.send({ auth: false, apiToken: null });
};



function panel(req,reply)
{
     //id=res.locals.id;
     id=req.decodedToken.id;
     username=reply.locals.decodedToken.username
    //const message=user+'- You are login to panel'
    reply.send({
        'message':'You are login to panel',
        'id':id,
        'username':username
    })
}

//---------------------------- Export Controller
module.exports={
    loginSubmit,
    panel,
    logOut
}

/*          # Test Token #
  for login => send formUsername , formPassword , formApiKey with POST Method and get Token with this route :
  http://localhost:3000/api/v1/user/login

  send apiToken as request parameter to access to user routes with this address :
  http://localhost:3000/api/v1/user/pabel


*/
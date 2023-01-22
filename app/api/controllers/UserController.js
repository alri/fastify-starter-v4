//-----------------------------------------
//-----------------------------------------
//------------- API User Controller
//------------------------------------------
//-----------------------------------------



//-------------- import lib & middleware
const  jwt  =  require('jsonwebtoken');
const bcrypt = require('bcrypt');


//------------- import model
const User = requiree('/app/models/nosql/UserModel.js');


//--------------------------------------
//----------- User api Controller Functions
//---------------------------------------


function loginSubmit(req,reply){
   
        
     const username=req.body.username;
     const password=req.body.password;
     const apiKey=req.body.apiKey;

     User
  .findOne({
    username: username,
    apiKey:apiKey
  })
  .then(doc => {
    if(doc)
    {
        bcrypt.compare(password, doc.password, function (err, result) {
        
        if (result === true) {
          
           //----- user have permision and create token
            const  expiresIn  =  5  *  60;
            const  accessToken  =  jwt.sign({ id: doc._id,username:doc.username }, process.env.APP_SECRET, {
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
        })
    }

    else if(!doc)
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

  })
  .catch(err => {
   //res.send(err)
     const response = {
                "message":"Server Error !",
                "status": "error",
                "token": '',
                'expire':'',
                }
            reply.code(500)
            reply.send(response);
  })     

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
  for login => send username , password , apiKey with POST Method and get Token with this route :
  http://localhost:3000/api/v1/login

  send apiToken as request parameter to access to user routes with this address :
  http://localhost:3000/api/v1/pabel


*/
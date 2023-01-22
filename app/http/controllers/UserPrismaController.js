//-----------------------------------------
//-----------------------------------------
//------------- HTTP UserController
//------------------------------------------
//-----------------------------------------



//--------------------------
//------- Import Models & Libs
//--------------------------
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');


//--------------------------------------
//----------- Home Controller Functions
//---------------------------------------

async function signupForm(req,reply)
{
   const csrfToken = await reply.generateCsrf()
   let data={'_csrf':csrfToken}
   return reply.view('user/prisma/signup.njk',data);
}

async function signupSubmit(req,reply)
{
    //------- getdata
    let formUsername=req.body.formUser;
    let formEmail=req.body.formEmail;
    let plaintextPassword=req.body.formPassword
    let password= await bcrypt.hash(plaintextPassword,10);
    let apiKey=cryptoRandomString({length: 32, type: 'base64'})

    //return({password:password,apiKey:apiKey})

   
    //----------- server side validation
  
    //--check username or email exist
    let userExist = await req.server.prisma.user.findFirst({
        where: { 
           OR:[
               {username:formUsername},
               {email:formEmail}
           ]
        },
      })

    if(userExist)
    {
        req.flash('error','نام کاربری یا آدرس ایمیل قبلا انتخاب شده');
        return reply.redirect('/user/signup')
    }
  
  
    //---------- create user
    try{
      
        const newUser = await req.server.prisma.user.create({
            data: {
                username: formUsername,
                email: formEmail,
                password:password,
                apiKey:apiKey
            },
          })
      

              let message=formUsername+'کاربر ایجاد شد'
              req.flash('success',message);
              return reply.redirect('/user/signup')
    }catch(err)
     {
        reply.send(err);
        req.flash('error',err.message);
        return reply.redirect('/user/signup')
    }
}


async function signinForm(req,reply)
{
    const csrfToken = await reply.generateCsrf()
    let data={'_csrf':csrfToken}
    return reply.view('user/prisma/signin.njk',data);
}


async function signinSubmit(req,reply){


     let formUsername=req.body.formUser;
     let password=req.body.formPassword;


     try{
        const user = await req.server.prisma.user.findUnique({
            where: {
              username: formUsername,
            },
          })
              
         let match = await bcrypt.compare(password, user.password)
        
          if (match) {
              
           //create session and login
           let userData={
              id:user.id,
              username:user.username,
              isAdmin:false,
              userAgent:"test"
           }
           req.session.set('user',userData);
           return reply.redirect('/user/panel')
        
        } else {
          // create error
           req.flash('error','نام کاربری یا رمز عبور صحیح نمیباشد');
           return reply.redirect('/user/signin')
        }
        
     }
     catch(error){
          req.flash('error','کاربر مورد نظر پیدا نشد');
          return reply.redirect('/user/signin')
     }
}


function signout(req, reply) {
        req.session.delete()
        return reply.redirect('/user/signin');
}


function panel(req,reply)
{
    //-- get sessio
    const user=req.session.get('user')
    //-- get value of session
    const id = req.session.get('user').id
    const username= req.session.get('user').username
    const message=username+'- You are login to panel'
   
    //--- we can pass session with data
    const data={
        user:req.session.get('user')
    }
    
    return reply.view('user/prisma/panel.njk',data);
}

//---------------------------- Export Controller
module.exports={
    signinForm,
    signinSubmit,
    signupForm,
    signupSubmit,
    signout,
    panel
}
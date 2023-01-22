const Validator = require('validatorjs');

//----setup Validator Extra Work
const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[-# -/:-@\[-`{-~]).{6,64}$/;

Validator.register('password_policy', value => passwordRegex.test(value),
    'انتخاب یک عدد و یک کاراکتر خاص نظیر @ الزامی است');

    
async function signin(request,reply,done){

    //--- just for api validation
    request.headers = {
        'x-requested-with': 'XMLHttpRequest',
      }
      

    const data=request.body;

     const rules = {
        "formUsername": "required|alpha",
        "formPassword": "required|string|min:6",
    }
    const messages ={
        "required.formUsername":"فیلد نام کاربری الزامی است",
        "alpha.formUsername":"فقط کاراکتر های الفبایی",
        "min.formPassword":"رمز عبور کوتاه است"
    }

    let validation = await new Validator(data, rules ,messages);


    if(validation.passes())  // true
    done()

    if(validation.fails())  // false
    {
        if (request.headers["x-requested-with"] == 'XMLHttpRequest') {
            //---check ajax request
            // console.log("ajax validation")
            //console.log(request.headers)
            let data={
                'code':422,
                'status':'error',
                'message':'validation errors',
                'validation':validation.errors.all()
            }
            return reply.code(422).send(data)
       }else{
         // console.log("http validation")
        //console.log(request.headers) 
           //-------- http request
        //console.log(validation.errors.all())
        for (const property in validation.errors.all()) {
               
                let error = property+"Error"
                //console.log(error);
                request.flash(error,validation.errors.all()[property]);
            }

            reply.redirect('/signin')
        }
    } 
}

module.exports={
    signin,
}
//-----------------------------------------
//-----------------------------------------
//------------- API TodoController
//------------------------------------------
//-----------------------------------------



//--------------------------
//------- import Libs
//--------------------------
const path = require('path');


//--------------------------
//------- import Models
//--------------------------
const Todo = requiree('/app/models/nosql/TodoModel')



//--------------------------------------
//----------- Todo Controller Functions
//---------------------------------------

async function create(req,reply){
    const csrfToken = await reply.generateCsrf()
    return reply.send({ csrfToken:csrfToken})
}

async function createSubmit(req,reply)
{
         /*
        //----- server side validation
        let errors=["خطای اول","خطای دوم"]
        let data={
            code:"200",
            success:false,
            type:"server side validation",
            message:"عملیات ایجاد انجام نشد",
            errors:errors
        }
        return res.status(200).json(data)
        */

        //----------- DB
        const record= new Todo({
            'content':req.body.formContent
        })
    
        try{
            let doc = await record.save();

            let data={
                code:"200",
                success:true,
                message:"رکورد جدید ایجاد شد",
            }
            return reply.status(200).send(data)
        }catch(er){
            let data={
                code:"500",
                success:false,
                type:"database error",
                message:"رکورد قبلا ایجاد شده است",
            }
            return reply.code(500).send(data)
        }
    
}

async function read(req,reply)
{
   
       
    try{

        let result = await Todo.find();
        
        //console.log(result)

        //----------- create response
        let data={
           success:true,
           items:result
        }

        return reply.code(200).send(data)
    
    }catch(err){
        console.log(err);
        return reply.send("See Error In Console !")
    }

}

function update(req,reply){
    return res.send({ csrfToken: req.csrfToken() })
}
async function updateSubmit(req,res)
{
        /*
       //----- server side validation
       let errors=["خطای اول","خطای دوم"]
       let data={
           code:"200",
           status:"error",
           type:"server side validation",
           message:"عملیات ایجاد انجام نشد",
           errors:errors
       }
       return res.status(200).json(data)
       */

       //----------- DB
   
       try{
            let doc = await Todo.findOneAndUpdate({
                id:req.body.id
            },{
                content:req.body.formContent
            },{
                new: true, 
                runValidators: true,
                context: 'query'
            })

           let data={
               code:"200",
               success:true,
               message:"رکورد ویرایش شد",
               id:doc.id
           }
           return reply.code(200).send(data)
       }catch(err){
        //console.log(pe.render(err))
        //res.end("See Error In Console !")
           let data={
               code:"500",
               success:false,
               type:"database error",
               message:"این نام قبلا رزرو شده است",
           }
           return reply.code(500).json(data)
       }

}



async function delSubmit(req,reply)
{
   
        const id = req.params.id
        

        try{
            let doc = await Todo.findOneAndRemove({
                id:id
            })

            let data={
                code:"200",
                success:true,
                message:"عملیات حذف انجام شد",
                id:id
            }

            reply.code(200).json(data)

        }catch(err){
            let data={
                code:"500",
                success:false,
                message:"عملیات حذف انجام نشد",
                error:err
            }
            reply.code(500).send(data)
        }status
       
}



//---------------------------- Export Controller
module.exports={
    create,
    createSubmit,
    read,
    update,
    updateSubmit,
    delSubmit,
}
const { PrismaClient ,Prisma } = require('@prisma/client')
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient()



async function index(req,reply){

    let data={
        'type':'sql base',
        'faker work': faker.name.fullName(),
        'insert unique user':'http://localhost:3000/test/prisma/insert',
        'insert array of users (not suported in sqlite)':'http://localhost:3000/test/prisma/insert/multiple',
        'insert user with article':'http://localhost:3000/test/prisma/insert/relation',
        'read user':'http://localhost:3000/test/prisma/read',
        'read all users':'http://localhost:3000/test/prisma/read/all',
        'read user with articles':'http://localhost:3000/test/prisma/read/relation',
        'update user email':'http://localhost:3000/test/prisma/update',
        'delete user with related data':'http://localhost:3000/test/prisma/delete',
        '------':'-------',
        'insert articla without user and get error':'http://localhost:3000/test/prisma/article/insert/error',
        'insert article related user':'http://localhost:3000/test/prisma/article/insert',
    }
    return data
    return reply.send(data)
}

async function insert(req,reply){
    try {
        //---random data
        let userData={
            email:faker.internet.email(),
            username:faker.name.firstName(),
            password:'123456',
        }


        const newUser = await prisma.user.create({
            data: {
              username: 'Alri',
              email: 'info.alri@gmail.com',
              password:'123456'
            },
          })
      
        return(newUser);

    } catch (error) {
        //-- if error from prisma
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2002') {
              console.log(
                'نام کاربری یا ایمیل قبلا ثبت شده است'
              )
            }
            return error
          }
         
        //throw new Error(error)
        //return reply.send(error)
        //return(this.httpErrors.notFound())
    }
}


async function insertMutiple(req,reply){
    try {

        //---------- Not Work In Sqlite
        const newUsers = await prisma.user.createMany({
            data: [
                {
                    email:faker.internet.email(),
                    username:faker.name.firstName(),
                    password:'123456',
                },
                {
                    email:faker.internet.email(),
                    username:faker.name.firstName(),
                    password:'123456',
                },
                {
                    email:faker.internet.email(),
                    username:faker.name.firstName(),
                    password:'123456',
                },
            ],
            skipDuplicates: true, // Skip duplicate records
          })
      
        return(newUsers);
      

    } catch (error) {
         return error
        //throw new Error(error)
        //reply.send(error)
        //return(this.httpErrors.notFound())
    }
}

async function insertRelation(req,reply){
    try {
      
        const newUser = await prisma.user.create({
            data: {
              username: 'Saeedeh',
              email: 'info.saeedeh@gmail.com',
              password:'123456',
              articles: {
                create: {
                  title: 'Include this post 1!',
                  content: 'Include this post content 1!',
                },
              },
            },
          })
      
        return(newUser);

    } catch (error) {
         return error
        //throw new Error(error)
        //reply.send(error)
        //return(this.httpErrors.notFound())
    }
}

async function read(req,reply){
    try {
      
        const user = await prisma.user.findUnique({
            where: {
              id: 1,
            },
          })
        return(user);

    } catch (error) {
         return error
        //throw new Error(error)
        //reply.send(error)
        //return(this.httpErrors.notFound())
    }
}

async function readAll(req,reply){
    try {
      
        const users = await prisma.user.findMany()
        return(users);

    } catch (error) {
         return error
        //throw new Error(error)
        //reply.send(error)
        //return(this.httpErrors.notFound())
    }
}

async function readRelation(req,reply){
    try {
      
        const user = await prisma.user.findUnique({
            where: {
              id: 1,
            },
            include: {
              articles: true,
            },
          })

        return(user);

    } catch (error) {
         return error
        //throw new Error(error)
        //reply.send(error)
        //return(this.httpErrors.notFound())
    }
}

async function update(req,reply){
    try {
      
        const updateUser = await prisma.user.update({
            where: {
                email: 'info.alri@gmail.com',
            },
            data: {
                email: 'info.alri@prisma.io',
            },
          })
        return(updateUser);

    } catch (error) {
         return error
        //throw new Error(error)
        //reply.send(error)
        //return(this.httpErrors.notFound())
    }
}

async function deletee(req,reply){
    try {
      
        //--- first delete related records
        
          const update = await prisma.user.update({
            where: {
              id: 1,
            },
            data: {
              articles: {
                deleteMany: {},
              },
            },
          })

          //--- then delete user
          const deleteUser = await prisma.user.delete({
            where: {
              id: 1,
            },
          })

         
          return({'message':'user and user articles is deleted'})

    } catch (error) {
         return error
        //throw new Error(error)
        //reply.send(error)
        //return(this.httpErrors.notFound())
    }
}

async function articleInsertError(req,reply){
    try {
        
        //-- we create post without user and we get error . because post is related with user

        const newArticle = await prisma.article.create({
            data: {
              title: 'Alri blog post',
              content: 'Alri blog post Content',
            },
          })
      
        return(newArticle);

    } catch (error) {
         return error
        //throw new Error(error)
        //reply.send(error)
        //return(this.httpErrors.notFound())
    }
}

async function articleInsert(req,reply){
    try {
        
        //-- we create article related with user

        //-------------------------- Method 1
        //-- first find user
        const user = await prisma.user.findUnique({
            where: {
                id: 1,
            },
        })
        const newArticle = await prisma.article.create({
            data: {
              title: 'Alri Article title 1 ',
              content: 'Alri Article Content 1',
              authorId:user.id
            },
          })
          

          //---------------------------- Method 2
          /*
          const update = await prisma.user.update({
            where: {
              id: 2,
            },
            data: {
              articles: {
                create: {
                    title: 'Alri Article title 1 ',
                    content: 'Alri Article Content 1',
                  },
              },
            },
          })
          */

         //--------------------------------- method 3
         /*
         const createPost = await prisma.article.create({
          data: {
              title: 'Alri Article title 5 ',
              content: 'Alri Article Content 5',
              author: {
                connect: {
                  id: 1,
                },
              },
            }

          })
          */

        return({message:'insert article done'});

    } catch (error) {
         return error
        //throw new Error(error)
        //reply.send(error)
        //return(this.httpErrors.notFound())
    }
}

//---------------------------- Export Controller
module.exports = {
    index,
    insert,
    articleInsert,
    articleInsertError,
    insertMutiple,
    insertRelation,
    read,
    readAll,
    readRelation,
    update,
    deletee,
}
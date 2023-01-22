//--------------------------
//------- import Models & Libs
//--------------------------
const { faker } = require('@faker-js/faker');


//------------------------------------------
//------------------------------------------
//----------------- Mongo DB
//------------------------------------------
//------------------------------------------
async function dbInsert(req, reply) {   
    //'name': faker.name.firstName(),
    //'familly': faker.name.lastName()
    try {
        const record = new Sample({
            'name': faker.name.firstName(),
            'familly': faker.name.lastName()
        });
        let doc = await record.save()
        return(doc);

    } catch (error) {
         return error
        //throw new Error(error)
        //reply.send(error)
        //return(this.httpErrors.notFound())
    }

}


async function dbRead(req, reply) {
    try {
        let doc = await Sample.find({
            name: 'alirezaa' // search query
        })
        if(doc.length!=0){
            reply.send(doc)
        }else{
            return({'message':'not record find'})
            //reply.send({'message':'not record find'})
        }
        

    } catch (err) {
        reply.send(err)
    }
}


async function dbReadAll(req, reply) {
    try {
        let docs = await Sample.find()
        if(docs.length!=0){
            reply.send(docs)
        }else{
            return({'message':'not records find'})
            //reply.send({'message':'not record find'})
        }
    } catch (err) {
        return reply.send(err)
    }
}


async function dbUpdate(re, reply) {
    try {

        let doc = await Sample.findOneAndUpdate({
            id: 1 // search query
        }, {
            name: 'alri' // field:values to update
        }, {
            new: true, // return updated doc
            runValidators: true // validate before update
        })
        reply.send(doc)

    } catch (err) {
        return err
    }

}



async function dbDelete(re, reply) {
    try {
        let doc = await Sample.findOneAndRemove({
            name: 'alri'
        })
        reply.send(doc)

    } catch (err) {
        return err
    }

}

//------------------------------------------
//------------------------------------------
//----------------- Promise
//------------------------------------------
//------------------------------------------
function dbInsertPromise(req, reply) {
    const record = new Sample({
        'name': 'alireza',
        'familly': 'abyari'
    });

    record.save()
        .then(doc => {
            reply.send(doc);
        })
        .catch(err => {
            reply.send(err);
        })
}


function dbReadPromise(req, reply) {
    Sample
        .find({
            name: 'alireza' // search query
        })
        .then(doc => {
            return reply.send(doc)
        })
        .catch(err => {
            return reply.send(err)
        })

}

function dbUpdatePromise(re, reply) {
    //---------- find one record
    Sample
        .findOneAndUpdate({
            name: 'alireza' // search query
        }, {
            name: 'alri' // field:values to update
        }, {
            new: true, // return updated doc
            runValidators: true // validate before update
        })
        .then(doc => {
            return reply.send(doc)
        })
        .catch(err => {
            console.error(err)
        })

}



function dbDeletePromise(req, reply) {
    //----- find one record
    Sample
        .findOneAndRemove({
            name: 'alireza'
        })
        .then(doc => {
            return reply.send(doc)
        })
        .catch(err => {
            console.error(err)
        })

}


//---------------------------- Export Controller
module.exports = {
    dbInsert,
    dbRead,
    dbReadAll,
    dbUpdate,
    dbDelete,
    dbInsertPromise,
    dbReadPromise,
    dbUpdatePromise,
    dbDeletePromise,
  
}
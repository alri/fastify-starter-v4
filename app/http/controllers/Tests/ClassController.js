//##########################################
//######################################
//####################### Use Class and Reposotories With Mongose
//######################################
//###########################################

const SampleRepository = requiree("./app/repositories/SampleRepository");

 class SampleController{

     async apiGetAllSamples(req, reply){
      
        try {
          const samples =  await SampleRepository.getAllSamples();
          if(!samples){
             res.code(404).send("There are no article published yet!")
          }
          return reply.send(samples);
        } catch (error) {
            return reply.code(500).send({error: error})
        }
 
    }
 
     async apiGetSampleById(req, reply){
       try {
          let id = req.params.sampleId || {};
          const sample = await SampleRepository.getSamplebyId(id);
          return reply.send(sample);
       } catch (error) {
        return reply.code(500).send({error: error})
       }
    }
 
     async apiCreateSample(req, reply){
       try {
          const createdSample =  await SampleRepository.createSample(req.body);
          return reply.send(createdSample);
       } catch (error) {
        return reply.code(500).send({error: error});
       }
    }
 
     async apiUpdateSample(req, reply){
       try {
          const comment = {}
          comment.title        = req.body.title;
          comment.body         = req.body.body;
          comment.articleImage = req.body.article_image
 
          const updatedSample = await SampleRepository.updateSample(comment);
 
          if(updatedSample.modifiedCount === 0){
             throw new Error("Unable to update article, error occord");
          }
 
          reply.send(updatedSample);
 
       } catch (error) {
        reply.code(500).send({error: error});
       }
    }
 
     async apiDeleteSample(req, reply){
          try {
             const sampleId = req.params.id;
             const deleteResponse =  await SampleRepository.deleteSample(sampleId)
             reply.send(deleteResponse);
          } catch (error) {
            reply.code(500).send({error: error})
          }
    }
 
 }

 module.exports = new SampleController()
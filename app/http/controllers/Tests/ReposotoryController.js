//##########################################
//######################################
//####################### Use Reposotory
//######################################
//###########################################

const SampleRepository = requiree("./app/repositories/SampleRepository");



     async function apiGetAllSamples(req, reply){
        try {
          const samples = await SampleRepository.getAllArticles();
          if(!samples){
             res.status(404).json("There are no article published yet!")
          }
          reply.json(samples);
        } catch (error) {
            reply.status(500).json({error: error})
        }
 
    }
 
     async function apiGetSampleById(req, reply){
       try {
          let id = req.params.id || {};
          const sample = await SampleRepository.getSamplebyId(id);
          reply.json(sample);
       } catch (error) {
        reply.status(500).json({error: error})
       }
    }
 
     async function apiCreateSample(req, reply){
       try {
          const createdSample =  await SampleRepository.createSample(req.body);
          reply.json(createdSample);
       } catch (error) {
        reply.status(500).json({error: error});
       }
    }
 
     async function apiUpdateArticle(req, reply){
       try {
          const comment = {}
          comment.title        = req.body.title;
          comment.body         = req.body.body;
          comment.articleImage = req.body.article_image
 
          const updatedSample = await SampleRepository.updateSample(comment);
 
          if(updatedSample.modifiedCount === 0){
             throw new Error("Unable to update article, error occord");
          }
 
          reply.json(updatedSample);
 
       } catch (error) {
        reply.status(500).json({error: error});
       }
    }
 
     async function apiDeleteSample(req, reply){
          try {
             const sampleId = req.params.id;
             const deleteResponse =  await SampleRepository.deleteSample(sampleId)
             reply.json(deleteResponse);
          } catch (error) {
            reply.status(500).json({error: error})
          }
    }
 
 

 //---------------------------- Export Controller
module.exports = {
    apiGetAllSamples,
    apiGetSampleById,
    apiCreateSample,
    apiUpdateArticle,
    apiDeleteSample
}
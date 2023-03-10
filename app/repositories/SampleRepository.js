const Sample = requiree("./app/models/nosql/SampleModel");

class SampleRepository{
     async  getAllSamples(){
        try {
            const allSamples = await  Sample.find();
            return allSamples;
        } catch (error) {
            console.log(`Could not fetch articles ${error}`)
        }
    }

     async  createSample(data){
        try {

            const newSample = {
                title: data.title,
                body: data.body,
                article_image: data.article_image
            }
           const response = await new Sample(newArticle).save();
           return response;
        } catch (error) {
            console.log(error);
        } 

    }
     async  getSamplebyId(articleId){
        try {
            const singleArticleResponse =  await Sample.findById({_id: articleId});
            return singleArticleResponse;
        } catch (error) {
            console.log(`Article not found. ${error}`)
        }
    }

     async  updateSample(title, body, articleImage){
            try {
                const updateResponse =  await Sample.updateOne(
                    {title, body, articleImage}, 
                    {$set: {date: new Date.now()}});

                    return updateResponse;
            } catch (error) {
                console.log(`Could not update Sample ${error}` );

        }
    }

     async  deleteSamle(sampleId){
        try {
            const deletedResponse = await Sample.findOneAndDelete(sampleId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could  ot delete article ${error}`);
        }

    }
}

module.exports = new SampleRepository()

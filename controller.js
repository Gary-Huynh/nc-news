const { selectAllTopics, selectAllEndpoints, selectSpecificArticle } = require("./model")
const endpoints = require('./endpoints')




exports.getAllTopics = (req, res, next)=>{

    selectAllTopics()
    .then((allTopics)=>{

        res.status(200).send({allTopics})

    })
    .catch(next)
}
exports.getAllEndpoints = (req, res, next)=>{
 
        res.status(200).send(endpoints)

}



exports.getSpecificArticle = (req,res,next)=>{
    selectSpecificArticle(req.params.article_id)
    .then((article)=>{
        res.status(200).send({article})
    })
    .catch(next)

}

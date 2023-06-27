

const { selectAllTopics, selectSpecificArticle, selectAllArticles, selectArticleComments, updateArticleVote } = require("./model")

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

exports.getArticleComments = (req,res,next)=>{

    selectArticleComments(req.params.article_id)
    .then((comments)=>{
        res.status(200).send({comments})
    })
    .catch(next)
}
exports.getAllArticles = (req, res, next)=>{
   const{sort_by} = req.query
    selectAllArticles(sort_by)
    .then((articles)=>{
        res.status(200).send({articles})
    })
    .catch(next)
}

exports.patchArticleVote = (req, res, next)=>{
    updateArticleVote(req.params.article_id,req.body.inc_votes)
    .then((body)=>{
        res.status(200).send(body)
    })
    .catch(next)
}
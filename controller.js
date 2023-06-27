

const { selectAllTopics, selectSpecificArticle, selectAllArticles, selectArticleComments, createArticleComment } = require("./model")

const endpoints = require('./endpoints')
const { checkArticleExists } = require("./db/seeds/utils")




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

exports.postArticleComment = (req, res, next)=>{

const article_id = req.params.article_id
const username = req.body.username
const commentBody = req.body.body

    Promise.all([checkArticleExists(article_id),createArticleComment(article_id, username, commentBody)])
    .then((newComment)=>{
        res.status(201).send(newComment[1])

    })
    .catch(next)
}
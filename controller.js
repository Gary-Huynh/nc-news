

const { selectAllTopics, selectSpecificArticle, selectAllArticles, selectArticleComments, createArticleComment, updateArticleVote, deleteSelectedComment, selectAllUsers, selectSpecificUser, updateCommentVote, createArticle, createTopic, deleteSelectedArticle, addUser  } = require("./model")


const endpoints = require('./endpoints')
const { checkArticleExists, checkTopicExists, checkCommentExists } = require("./db/seeds/utils")




exports.getAllTopics = (req, res, next)=>{

    selectAllTopics()
    .then((allTopics)=>{

        res.status(200).send({allTopics})

    })
    .catch(next)
}

exports.getSpecificArticle = (req,res,next)=>{
    selectSpecificArticle(req.params.article_id)
    .then((article)=>{
        res.status(200).send({article})
    })
.catch(next)
}

exports.getArticleComments = (req,res,next)=>{
 const {p, limit} = req.query
    selectArticleComments(req.params.article_id,p,limit)
    .then((comments)=>{
        res.status(200).send({comments})
    })
    .catch(next)
}
exports.getAllArticles = (req, res, next)=>{
   const{sort_by,topic, order, p, limit} = req.query
    if(topic){
    Promise.all([checkTopicExists(topic),selectAllArticles(sort_by,topic,order,p,limit)])
    .then((articles)=>{
        res.status(200).send({articles:articles[1]})
    })
    .catch(next)
    }

    else {selectAllArticles(sort_by,topic,order, p, limit)
        .then((articles)=>{
            res.status(200).send({articles})
        })
    .catch(next)}
}


exports.patchArticleVote = (req, res, next)=>{
    const article_id = req.params.article_id
    Promise.all([checkArticleExists(article_id),updateArticleVote(req.params.article_id,req.body.inc_votes)])
    .then((body)=>{
        const updatedArticle = body[1]
        res.status(200).send({article:updatedArticle})
    })
    .catch(next)
}
exports.postArticleComment = (req, res, next)=>{

const article_id = req.params.article_id
const username = req.body.username
const commentBody = req.body.body

    Promise.all([checkArticleExists(article_id),createArticleComment(article_id, username, commentBody)])
    .then((returnedComment)=>{
        const comment = returnedComment[1][0]
        res.status(201).send({comment})
    })
    .catch(next)
}

exports.deleteComment = (req, res, next)=>{
    const comment_id = req.params.comment_id
    deleteSelectedComment(comment_id)
    .then(()=>{
        res.status(204).send()
    })
    .catch(next)
}

exports.getAllUsers = (req, res, next)=>{
    selectAllUsers()
    .then((allUsers)=>{
        res.status(200).send({allUsers})
    })
    .catch(next)

}
exports.getSpecificUser = (req, res, next) =>{
    const username = req.params.username
    selectSpecificUser(username)
    .then((user)=>{
        res.status(200).send({user})
    })
    .catch(next)
}

exports.patchCommentVote = (req, res ,next)=>{
    const comment_id = req.params.comment_id
    const votes = req.body.inc_votes
    Promise.all([checkCommentExists(comment_id),updateCommentVote(comment_id,votes)])
    .then((updatedComment)=>{
        res.status(200).send(updatedComment[1])
    })
    .catch(next)

}

exports.postArticle = (req, res ,next)=>{

    createArticle(req.body)
    .then((newArticle)=>{
        res.status(201).send({newArticle})
    })
    .catch(next)
}

exports.postTopic = (req, res, next)=>{
    createTopic(req.body)
    .then((newTopic)=>{
        res.status(201).send({newTopic})
    })
    .catch(next)
}

exports.deleteArticle = (req, res, next)=>{
    
    deleteSelectedArticle(req.params.article_id)
    .then(()=>{
        res.status(204).send()
    })
    .catch(next)
}

exports.postUser = (req,res,next)=>{
    addUser(req.body)
    .then((newUser)=>{
        res.status(201).send({newUser})
        
    })
    .catch(next)
}
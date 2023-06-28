const express = require('express')

const { getAllTopics, getSpecificArticle, getAllEndpoints, getAllArticles, getArticleComments, postArticleComment, patchArticleVote, deleteComment, getAllUsers, getSpecificUser, patchCommentVote, postArticle  } = require('./controller')

const { handleServerErrors, handlePsqlErrors, handleCustomErrors } = require('./errors/errors')

const app = express()
app.use(express.json())


app.get('/api/topics', getAllTopics)

app.get('/api/articles/:article_id',getSpecificArticle)

app.get('/api/', getAllEndpoints)

app.get('/api/articles/:article_id/comments',getArticleComments)

app.get('/api/articles',getAllArticles)

app.patch("/api/articles/:article_id",patchArticleVote)

app.post("/api/articles/:article_id/comments",postArticleComment)

app.delete('/api/comments/:comment_id', deleteComment)

app.get("/api/users",getAllUsers)

app.get("/api/users/:username",getSpecificUser)

app.patch("/api/comments/:comment_id",patchCommentVote)

app.post("/api/articles",postArticle)

app.all("*", (_,res)=>{
  res.status(404).send({msg:"Not Found"})
})


app.use((err, req, res, next) => {
  handlePsqlErrors(err, req, res, next)
})

app.use((err, req, res, next) => {
  handleCustomErrors(err, req, res, next)
})

app.use((err, req, res, next) => {
  handleServerErrors(err, req, res, next)
})



module.exports = app


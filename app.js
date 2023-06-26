const express = require('express')
const { getAllTopics, getSpecificArticle, getAllEndpoints, getArticleComments } = require('./controller')
const { handleServerErrors, handlePsqlErrors, handleCustomErrors } = require('./errors/errors')

const app = express()



app.get('/api/topics', getAllTopics)

app.get('/api/articles/:article_id',getSpecificArticle)


app.get('/api/', getAllEndpoints)

app.get('/api/articles/:article_id/comments',getArticleComments)







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


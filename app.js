const express = require('express')
const { getAllTopics } = require('./controller')

const app = express()



app.get('/api/topics', getAllTopics)






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
const express = require('express')
const { getAllTopics, getAllEndpoints } = require('./controller')
const { handleServerErrors } = require('./errors/errors')

const app = express()



app.get('/api/topics', getAllTopics)

app.get('/api/', getAllEndpoints)


  app.use((err, req, res, next) => {
    handleServerErrors(err, req, res, next)
  })
  



  module.exports = app
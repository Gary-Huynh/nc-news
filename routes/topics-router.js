const topicsRouter = require("express").Router()

const { getAllTopics, postTopic } = require('../controller')





topicsRouter
    .route("/")
    .get(getAllTopics)
    .post(postTopic)

module.exports = topicsRouter
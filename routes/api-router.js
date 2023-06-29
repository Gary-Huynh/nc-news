const apiRouter = require("express").Router();
const userRouter = require("./users-router")
const articlesRouter = require("./articles-router")
const commentsRouter = require("./comments-router")
const topicsRouter = require("./topics-router")
const endpoints = require("../endpoints.json")


apiRouter.get("/", (req, res,)=>{
    res.status(200).send(endpoints)
})

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/comments", commentsRouter);


module.exports = apiRouter
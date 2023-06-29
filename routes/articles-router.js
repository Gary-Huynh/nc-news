const articlesRouter = require("express").Router();

const { getSpecificArticle, getAllArticles, getArticleComments, postArticleComment, patchArticleVote, postArticle,deleteArticle  } = require('../controller')


articlesRouter
    .route("/")
    .get(getAllArticles)
    .post(postArticle)

articlesRouter
    .route("/:article_id")
    .get(getSpecificArticle)
    .patch(patchArticleVote)
    .delete(deleteArticle)

articlesRouter
    .route("/:article_id/comments")
    .get(getArticleComments)
    .post(postArticleComment)


module.exports = articlesRouter
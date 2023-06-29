const commentsRouter = require("express").Router();

const {deleteComment, patchCommentVote } = require('../controller')



commentsRouter
    .route("/:comment_id")
    .delete(deleteComment)
    .patch(patchCommentVote)





module.exports = commentsRouter

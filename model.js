
const db = require('./db/connection')




exports.selectAllTopics = () =>{

    return db.query('SELECT * FROM topics;')

    .then((allTopics)=>{
        return allTopics.rows
    })
}

exports.selectSpecificArticle = (article_id)=>{

 return db.query('SELECT * FROM articles WHERE article_id = $1',[article_id])
 .then((article)=>{

    if(!article.rows[0]){

        return Promise.reject({status:404, msg:(`No article with id ${article_id} found`)})
    }
    return article.rows
 })
}

exports.selectAllArticles = (sort_by="created_at")=>{


    const validSortBy = ["votes","article_id","created_at","comment_count"]
    if(!validSortBy.includes(sort_by)){
        return Promise.reject({status:400, msg:"Bad Request invalid sort_by"})
    }

    return db.query(`SELECT articles.author, title, articles.article_id, topic, articles.created_at,articles.votes,article_img_url, COUNT(comments.body) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY ${sort_by} DESC;`)
    .then((articles)=>{
        return articles.rows
    })
}



exports.selectArticleComments = (article_id)=>{
    return db.query("SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",[article_id])
    .then((comments)=>{

        if(!comments.rows[0]){

            return Promise.reject({status:404,msg:(`No article with id ${article_id} found`)})
        }
        return comments.rows

    })
}

exports.updateArticleVote = (article_id,votes)=>{
 return db.query("SELECT votes FROM articles WHERE article_id = $1;",[article_id])
 .then((body)=>{
    if(typeof votes !== "number"){
        return Promise.reject({status:400, msg:"Bad Request"})
    }
 const newVotes = body.rows[0].votes + votes

 return db.query("UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;",[newVotes,article_id])
 .then((updatedArticle)=>{
    // console.log(updatedArticle.rows[0],"here")
    return updatedArticle.rows[0]
 })
})
}
exports.createArticleComment = (article_id,username,commentBody)=>{

    const query = 'INSERT INTO comments (author,body,article_id) VALUES ($1,$2,$3) RETURNING*;'

    return db.query(query, [username, commentBody, article_id])
    .then((newComment)=>{

       return newComment.rows
    })
}

exports.deleteSelectedComment = (comment_id)=>{
    return db.query("DELETE FROM comments WHERE comment_id = $1 RETURNING *;",[comment_id])
    .then((result)=>{
        if(!result.rows[0]){
            return Promise.reject({status:404, msg:"Not Found"})
        }
        return result.rows[0]
    })
}
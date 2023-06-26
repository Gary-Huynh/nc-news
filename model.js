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

        return Promise.reject({status:404,msg:(`No article with id ${article_id} found`)})
    }
    return article.rows
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
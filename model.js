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

    })}
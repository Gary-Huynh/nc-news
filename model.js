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

exports.selectAllArticles = ()=>{

    return db.query('SELECT articles.author, title, articles.article_id, topic, articles.created_at,articles.votes,article_img_url, COUNT(comments.body) AS comment_count FROM articles JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC;')
    .then((articles)=>{
        return articles.rows
    })
}
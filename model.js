
const db = require('./db/connection')




exports.selectAllTopics = () =>{

    return db.query('SELECT * FROM topics;')

    .then((allTopics)=>{
        return allTopics.rows
    })
}

exports.selectSpecificArticle = (article_id)=>{

 return db.query(`SELECT articles.author, title, articles.article_id, topic, articles.created_at,articles.votes,article_img_url,articles.body, COUNT(comments.body) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1
  GROUP BY articles.article_id `,[article_id])
 .then((article)=>{
    if(!article.rows[0]){

        return Promise.reject({status:404, msg:(`No article with id ${article_id} found`)})
    }
    return article.rows[0]
 })
}

exports.selectAllArticles = (sort_by="created_at",topic,order = "DESC",p , limit)=>{
    let query = "SELECT articles.author, title, articles.article_id, topic, articles.created_at,articles.votes,article_img_url, COUNT(comments.body) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id "
    let queryValues = []
    const validSortBy = ["votes","article_id","created_at","comment_count"]
    if(!validSortBy.includes(sort_by)){
        return Promise.reject({status:400, msg:"Bad Request invalid sort_by"})
    }
    const validOrder = ["asc", "desc", "ASC", "DESC"]
    if(!validOrder.includes(order)){
        return Promise.reject({status:400, msg:"Bad Request invalid order"})
    }

    if(topic){
        query += `WHERE topic = $1`
        queryValues.push(topic)
    }

    query += `GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`

    if(p){
        let limit = 10
        let pageNum = (p-1)*10
        query+= ' LIMIT $1 OFFSET $2'
        queryValues.push(limit,pageNum)
    }

    if(limit){
        query += ' LIMIT $1'
        queryValues.push(limit)
    }
    return db.query(query,queryValues)

    .then((articles)=>{
        return articles.rows
    })
}



exports.selectArticleComments = (article_id,p,limit)=>{


    let query = 'SELECT * FROM comments WHERE article_id = $1'
    let queryValues = []
    queryValues.push(article_id)
    query += ' ORDER BY created_at DESC'
    if(limit){
        query += ' LIMIT $2'
        queryValues.push(limit)
    }
    if(p){
        let limit = 10
        let pageNum = (p-1)*10
        query+= ' LIMIT $2 OFFSET $3'
        queryValues.push(limit, pageNum)
    }
    return db.query(query,queryValues)

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

exports.selectAllUsers = ()=>{


return db.query("SELECT * FROM users;")
.then((allUsers)=>{
    return allUsers.rows
})

}

exports.selectSpecificUser = (username)=>{

return db.query("SELECT * FROM users WHERE username = $1;",[username])
.then((body)=>{
    if(!body.rows[0]){
        return Promise.reject({status:404, msg:"Not Found"})
    }
    return body.rows[0]
})

}

exports.updateCommentVote = (comment_id,votes)=>{
    return db.query('SELECT votes FROM comments WHERE comment_id = $1;',[comment_id])
    .then((resultVotes)=>{
        if(typeof votes !== "number"){
            return Promise.reject({status:400, msg:"Bad Request"})
        }
        const oldVotes = resultVotes.rows[0].votes
        const newVotes = oldVotes + votes
    return db.query('UPDATE comments SET votes = $1 WHERE comment_id = $2 RETURNING *;',[newVotes, comment_id])
    })
    .then((updatedComment)=>{
        return updatedComment.rows[0]
    })

}

exports.createArticle = (body)=>{
    return db.query('INSERT INTO articles(author,title,body,topic) VALUES($1,$2,$3,$4) RETURNING *;', [body.author, body.title, body.body, body.topic])
    .then((newArticle)=>{
       return newArticle.rows[0]
    })
}

exports.createTopic = (body)=>{
    return db.query('INSERT INTO topics(slug,description) VALUES($1,$2) RETURNING *;', [body.slug,body.description])
    .then((newArticle)=>{
       return newArticle.rows[0]
    })

}

exports.deleteSelectedArticle = (article_id)=>{
    return db.query("DELETE FROM articles WHERE article_id = $1 RETURNING *;",[article_id])
    .then((result)=>{
        if(!result.rows[0]){
            return Promise.reject({status:404, msg:"Not Found"})
        }
        return result.rows[0]
    })
}

exports.addUser =(newUser)=>{

        return db.query(`INSERT INTO users(username,name,avatar_url) VALUES($1,$2,$3) RETURNING *;`,[newUser.username, newUser.name, newUser.avatar_url])
        .then((body)=>{

            return body.rows[0]
         })
}
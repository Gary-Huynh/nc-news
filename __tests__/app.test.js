const app = require('../app')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index')
const request = require('supertest')


afterAll(() => {
    return db.end()
   })

beforeEach(() => {
return seed(data)
})


describe("GET /api/topics",()=>{

    test("200: /api/topics should return all topics available",()=>{

        return request(app).get('/api/topics').expect(200)
        .then(({body})=>{
            expect(body.allTopics.length).toBeGreaterThan(0)
            body.allTopics.forEach((topic)=>{
                expect(topic).toHaveProperty("slug", expect.any(String));
                expect(topic).toHaveProperty("description", expect.any(String));

            })
        })
    })
})

describe("GET /api/articles/:article_id",()=>{

    test("200: should return the article with the specified id",()=>{
        return request(app).get('/api/articles/2').expect(200)
        .then(({body})=>{
            expect(body.article.length).toBeGreaterThan(0)
            expect(body.article[0].article_id).toBe(2)
            expect(body.article[0]).toHaveProperty("title", expect.any(String));
            expect(body.article[0]).toHaveProperty("topic", expect.any(String));
            expect(body.article[0]).toHaveProperty("author", expect.any(String));
            expect(body.article[0]).toHaveProperty("body", expect.any(String));
            expect(body.article[0]).toHaveProperty("created_at", expect.any(String));
            expect(body.article[0]).toHaveProperty("votes", expect.any(Number));
            expect(body.article[0]).toHaveProperty("article_img_url", expect.any(String)); 
        })
    })
    test("400: invalid article id should return bad request",()=>{
        return request(app).get('/api/articles/banana').expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad Request")
        })
    })

    test("404: searching for an article that doesnt exist should return not found",()=>{
        return request(app).get('/api/articles/900').expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("No article with id 900 found")
        })
    })
    
})

describe("GET /api/",()=>{

    test("200: /api/ should return an object with descriptions of all valid endpoints",()=>{

        return request(app).get('/api/').expect(200)
        .then(({body})=>{
            expect(Object.keys(body).length).toBeGreaterThan(0)
            for(const keys in body){
                expect(typeof body[keys].description).toBe("string")
                expect(Array.isArray(body[keys].queries)).toBe(true)
                expect(typeof body[keys].format).not.toBe("null")
                expect(typeof body[keys].exampleResponse).toBe("object")
            }

        })
    })
})


describe("404: Not Found",()=>{

    test("404: invalid path should return a 404 not found", ()=>{  

        return request(app).get('/api/topicss').expect(404)
    })
})


describe("GET /api/articles",()=>{

    test("200: /api/articles should return an object with all current articles sorted by date in descending order",()=>{
        return request(app).get('/api/articles').expect(200)
        .then(({body})=>{
            expect(body.articles.length).toBe(13)
            expect(body.articles).toBeSortedBy("created_at",{descending:true})
           body.articles.forEach((article)=>{
            expect(article).toHaveProperty("author", expect.any(String));
            expect(article).toHaveProperty("title", expect.any(String));
            expect(article).toHaveProperty("article_id", expect.any(Number));
            expect(article).toHaveProperty("topic", expect.any(String));
            expect(article).toHaveProperty("created_at", expect.any(String));
            expect(article).toHaveProperty("votes", expect.any(Number));
            expect(article).toHaveProperty("article_img_url", expect.any(String));
            expect(article).toHaveProperty("comment_count", expect.any(String));
            expect(article).not.toHaveProperty("body")
        })
        })
    })

})

describe("GET /api/articles?sort_by=votes / article_id/created_at/comment_count",()=>{

    test("200: /api/articles?sort_by=article_id should return all articles sorted by article_id in descending order",()=>{

        return request(app).get("/api/articles?sort_by=article_id").expect(200)
        .then(({body})=>{
            expect(body.articles).toBeSortedBy("article_id",{descending:true})
        })
    })
    test("200: /api/articles?sort_by=votes should return all articles sorted by votes in descending order",()=>{

        return request(app).get("/api/articles?sort_by=votes").expect(200)
        .then(({body})=>{
            expect(body.articles).toBeSortedBy("votes",{descending:true})
        })
    })
    test("400: /api/articles?sort_by=banana should return a 400 bad request as it is not a valid sort_by",()=>{
        return request(app).get("/api/articles?sort_by=banana").expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad Request invalid sort_by")
        })
    })


})
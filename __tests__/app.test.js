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
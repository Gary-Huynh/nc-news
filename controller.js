const { selectAllTopics, selectAllEndpoints } = require("./model")
const endpoints = require('./endpoints')




exports.getAllTopics = (req, res, next)=>{

    selectAllTopics()
    .then((allTopics)=>{

        res.status(200).send({allTopics})

    })
    .catch(next)
}
exports.getAllEndpoints = (req, res, next)=>{
 
        res.status(200).send(endpoints)

}


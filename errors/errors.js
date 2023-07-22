exports.handlePsqlErrors = (err ,req, res, next) => {
    if (err.code === "22P02" || err.code === "23502" || err.code === "23503"){
        res.status(400).send({msg:"Bad Request", code:err.code})
    }
    else next(err);
    }
    

exports.handleCustomErrors = (err ,req, res, next) => {
    if (err.msg){
        res.status(err.status).send({msg: err.msg})
    }
    else next(err);
    }

exports.handleServerErrors = (err ,req, res, next) => {

    res.status(500).send({msg: "server error, real bad, please send help!!!"})
    }
    
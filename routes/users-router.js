const userRouter = require("express").Router();
const {getAllUsers, getSpecificUser, postUser} = require("../controller");




userRouter.get("/",getAllUsers)
userRouter.get("/:username",getSpecificUser)
userRouter.post("/", postUser)



module.exports = userRouter;

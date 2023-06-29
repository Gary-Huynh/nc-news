const userRouter = require("express").Router();
const {getAllUsers, getSpecificUser} = require("../controller")



userRouter.get("/",getAllUsers)
userRouter.get("/:username",getSpecificUser)




module.exports = userRouter;

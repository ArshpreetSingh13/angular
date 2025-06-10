

const router = require("express").Router()

const postController=require("../apis/posts/postController")


router.post("/post/add",postController.add)
router.post("/post/getall",postController.getAll)
router.post("/post/getone",postController.getOne)
router.post("/post/delete",postController.deleteOne)
router.post("/post/update", postController.updateOne)


module.exports=router
const router = require("express").Router()
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const postController=require("../apis/posts/postController")
const userController=require("../apis/user/userController")
const techController=require("../apis/technology/techController")
const commentController=require("../apis/comments/commentController")
const chatController=require("../apis/chats/chatController")
const answerConroller=require("../apis/answers/answerController")
const competitionController=require("../apis/compitions/compitionController")

router.post("/user/login",userController.login)

router.post("/user/add",upload.single("avtar"),userController.add) 

router.use(require("../middleware/middleware"))

router.post("/user/getall",userController.getAll)
router.post("/user/getOne",userController.getOne)
router.post("/user/delete",userController.deleteOne)
router.post("/user/update",upload.single("avtar"), userController.UpdateOne)

router.post("/tech/add",upload.single("image"), techController.add)
router.post("/tech/getall", techController.getAll)
router.post("/tech/getOne", techController.getOne)
router.post("/tech/deleteOne", techController.deleteOne)
router.post("/tech/updateOne", upload.single("image") ,techController.UpdateOne)

router.post("/post/add",postController.add)
router.post("/post/getall",postController.getAll)
router.post("/post/getone",postController.getOne)
router.post("/post/delete",postController.deleteOne)
router.post("/post/update", postController.updateOne)

router.post("/comment/add",commentController.add)
router.post("/comment/all",commentController.all)
router.post("/comment/getOne",commentController.getOne)
router.post("/comment/delete", commentController.deleteOne)
router.post("/comment/update", commentController.UpdateOne)

router.post("/chat/add",chatController.add)
router.post("/chat/all",chatController.getAll)
router.post("/chat/getOne",chatController.getOne)
router.post("/chat/delete",chatController.deleteOne)

router.post("/answer/add",answerConroller.add)
router.post("/answer/all",answerConroller.all)
router.post("/answer/getOne",answerConroller.getOne)
router.post("/answer/deleteOne",answerConroller.deleteOne)
router.post("/answer/UpdateOne",answerConroller.UpdateOne)

router.post("/compition/add",competitionController.add)
router.post("/compition/all",competitionController.all)
router.post("/compition/getOne",competitionController.getOne)
router.post("/compition/delete",competitionController.deleteOne)


module.exports=router
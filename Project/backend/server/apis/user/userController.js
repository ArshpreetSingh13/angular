const userModel = require("./userModel")

const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const { uploadImg } = require("../../utility/helper")



let add = (req, res) => {
    let errMsg = []
    if (!req.body.userName) {
        errMsg.push("userName is required")
    }
    if (!req.body.email) {
        errMsg.push("email is required")
    }
    if (!req.body.password) {
        errMsg.push("password is required")
    }
    if (!req.body.bio) {
        errMsg.push("bio is required")
    }
    if (!req.file) {
        errMsg.push("avtar is required")
    }
    if (!req.body.userType) {
        errMsg.push("userType is required")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 404,
            message: errMsg
        })
    }
    else {
        userModel.findOne({ email: req.body.email })
            .then(async (Exist) => {
                if (Exist == null) {
                    const newUser = new userModel()

                    newUser.userName = req.body.userName
                    newUser.email = req.body.email
                    newUser.password = bcrypt.hashSync(req.body.password, 10)
                    newUser.bio = req.body.bio
                    newUser.userType = req.body.userType

                    // newUser.avtar = req.body.avtar
                    if (req.file) {
                        try {

                            const url = await uploadImg(req.file.buffer)
                            console.log(url);

                            newUser.avtar = url
                        }
                        catch {
                            res.send({
                                success: false,
                                status: 409,
                                message: "cloudinary error"
                            })
                        }
                    }

                    newUser.save()
                        .then((savedUser) => {
                            res.send({
                                success: true,
                                status: 201,
                                message: savedUser
                            })
                        })
                        .catch((err) => {
                            res.send({
                                success: false,
                                status: 202,
                                message: "Error in saving user"
                            })
                        })
                }
                else {
                    res.send({
                        success: false,
                        status: 202,
                        message: "User Already exist"
                    })
                }
            })
            .catch(() => {
                res.send({
                    success: false,
                    status: 202,
                    message: "Internal server error"
                })
            })
    }
}


let getAll = (req, res) => {


    userModel.find()
        .then((Data) => {
            if (Data == null) {
                res.send({
                    success: false,
                    status: 404,
                    message: "User Not Found"
                })
            }
            else {
                res.send({
                    success: true,
                    status: 200,
                    message: "User Found",
                    data: Data
                })
            }
        })
        .catch(() => {
            res.send({
                success: false,
                status: 404,
                message: "Internal server error",

            })
        })



}


let getOne = (req, res) => {

    let errMsg = []
    if (!req.body._id) {
        errMsg.push("_id is required")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 402,
            message: errMsg
        })
    }
    else {


        userModel.findOne({ _id: req.body._id })
            .then((Data) => {
                if (Data == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "User Not Found"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "User Found",
                        data: Data
                    })
                }
            })
            .catch(() => {
                res.send({
                    success: false,
                    status: 404,
                    message: "Internal server error",

                })
            })
    }



}

let deleteOne = (req, res) => {

    let errMsg = []
    if (!req.body._id) {
        errMsg.push("_id is required")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 402,
            message: errMsg
        })
    }
    else {


        userModel.findOne({ _id: req.body._id })
            .then((Data) => {
                if (Data == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "User Not Found"
                    })
                }
                else {

                    Data.status = !Data.status

                    Data.save()
                        .then((DeletedData) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "User Found",
                                data: DeletedData
                            })
                        })
                        .catch(() => {
                            res.send({
                                success: false,
                                status: 402,
                                message: "Internal server error"

                            })
                        })


                }
            })
            .catch(() => {
                res.send({
                    success: false,
                    status: 404,
                    message: "Internal server error",

                })
            })
    }



}

let UpdateOne = (req, res) => {

    let errMsg = []
    if (!req.body._id) {
        errMsg.push("_id is required")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 402,
            message: errMsg
        })
    }
    else {



        userModel.findOne({ _id: req.body._id })
            .then(async (Data) => {
                if (Data == null) {
                    res.send({
                        success: false,
                        status: 404,
                        message: "User Not Found"
                    })
                }
                else {

                    if (req.body.userName) {
                        Data.userName = req.body.userName
                    }
                    if (req.body.email) {
                        Data.email = req.body.email
                    }

                    if (req.body.bio) {
                        Data.bio = req.body.bio
                    }

                    if (req.file) {
                        try {

                            const url = await uploadImg(req.file.buffer)
                            Data.avtar = url
                        }
                        catch {
                            res.send({
                                success: false,
                                status: 409,
                                message: "cloudinary error"
                            })
                        }
                    }
                }


                Data.save()
                    .then((DeletedData) => {
                        res.send({
                            success: true,
                            status: 200,
                            message: "User Found",
                            data: DeletedData
                        })
                    })
                    .catch(() => {
                        res.send({
                            success: false,
                            status: 402,
                            message: "Internal server error"

                        })
                    })



            })
            .catch(() => {
                res.send({
                    success: false,
                    status: 404,
                    message: "Internal server error",

                })
            })
    }



}


let login=(req,res)=>{
    let errMsg = []
    if (!req.body.email) {
        errMsg.push("email is required")
    }
    if (!req.body.password) {
        errMsg.push("password is required")
    }

    if(errMsg.length>0){
        res.send({
            success:false,
            status:202,   
            message:errMsg
        })
    }
    else{
        userModel.findOne({email:req.body.email})
        .then((LogUser)=>{
            if (LogUser==null){
                res.send({
                    success: false,
                    status: 202,
                    message:"User Not exist"
                })
            }
            else{
                bcrypt.compare(req.body.password,LogUser.password,function(err,ismatch){
                    if(!ismatch){
                        res.send({
                            success:false,
                            status:209,
                            message:"Paswword not Matched"
                        })
                    }
                    else{
                        const payload={
                            id:LogUser._id,
                            email:LogUser.email,
                            password:LogUser.password,
                            userType:LogUser.userType
                        }
                        let token=jwt.sign(payload,"123@123")
                        res.send({
                            success: true,
                            status: 209,
                            message: "Login successfull",
                            data:LogUser,
                            token: token
                        })
                    }
                })
            }
        })
        .catch()
    }
}


module.exports = {
    add, getAll, getOne, deleteOne, UpdateOne,login
}
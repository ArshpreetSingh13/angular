const postModel = require("./postModel")

let add = (req, res) => {

    let errMsg = []
    if (!req.body.title) {
        errMsg.push("Title is required")
    }
    if (!req.body.description) {
        errMsg.push("description is required")
    }
    if (!req.body.codeSnippet) {
        errMsg.push("codeSnippet is required")
    }
    if (!req.body.createdBy) {
        errMsg.push("createdBy is required")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 402,
            message: errMsg
        })

    }
    else {
        postModel.findOne({ title: req.body.title })
            .then((Exist) => {
                if (!Exist) {

                    let NewPostObj = new postModel()  
                    NewPostObj.title = req.body.title
                    NewPostObj.description = req.body.description
                    NewPostObj.codeSnippet = req.body.codeSnippet
                    NewPostObj.createdBy = req.body.createdBy

                    // console.log(req.body.title);
                    // console.log(req.body.description);
                    // console.log(req.body.codeSnippet);
                    // console.log(req.body.createdBy);


                    NewPostObj.save().then((savedData) => {
                        res.send({
                            success: true,
                            status: 201,
                            message: "Post Posted",
                            data: savedData
                        })
                    }).catch((err) => {
                        res.send({
                            success: false,
                            status: 409,
                            message: "Post is not Posted",
                            data: err

                        })
                    })
                }
                else {
                    res.send({
                        success: false,
                        status: 409,
                        message: "User Exists"
                    })
                }

            })
            .catch()

    }


}

let getAll = (req, res) => {

    postModel.find().
        then((AllData) => {
            res.send({
                success: true,
                status: 202,
                message: "data Found",
                data: AllData
            })
        })
        .catch((err) => {
            res.send({
                success: false,
                status: 404,
                message: "data not Found"

            })
        })
}


let getOne = (req, res) => {

    errMsg = []

    if (!req.body._id) {
        errMsg.push("Please Enter the ID")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 402,
            message: errMsg

        })
    }
    else {



        postModel.findOne({ _id: req.body._id }).
            then((AllData) => {
                if(AllData){
                    res.send({
                        success: true,
                        status: 202,
                        message: "data Found",
                        data: AllData
                    })
                }
                else{
                    res.send({
                        success: true,
                        status: 202,
                        message: "data not Found"
                    })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 404,
                    message: "data not Found"

                })
            })
    }
}

let deleteOne = (req, res) => {

    errMsg = []

    if (!req.body._id) {
        errMsg.push("Please Enter the ID")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 402,
            message: errMsg

        })
    }
    else {



        postModel.findOne({ _id: req.body._id }).
            then((Update) => {

                if(!Update){
                    res.send({
                        success: false,
                        status: 404,
                        message: "Data Not Found"
                        
                    })
                }
                else{
                    Update.status=!Update.status
                    Update.save()
                    .then((UpdatedData)=>{
                        res.send({
                            success: true,
                            status: 202,
                            message: "data Deleted",
                            data: UpdatedData
                        })
                    })
                    .catch(()=>{
                        res.send({
                            success: false,
                            status: 402,
                            message: "data error Found"
                            
                        })
                    })
                }

               
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 404,
                    message: "data not Found"

                })
            })
    }
}


let updateOne=(req,res)=>{

    errMsg = []

    if (!req.body._id) {
        errMsg.push("Please Enter the ID")
    }
    
    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 402,
            message: errMsg

        })
    }
    else {



        postModel.findOne({ _id: req.body._id }).
            then((OneData) => {
                if (OneData) {

                    if (req.body.title) {
                        OneData.title=req.body.title
                    }
                    if (req.body.description) {
                        OneData.description = req.body.description
                    }
                    if (req.body.codeSnippet) {
                        OneData.codeSnippet = req.body.codeSnippet
                    }
                    if (req.body.createdBy) {
                        OneData.createdBy = req.body.createdBy
                    }

                    OneData.save().then((savedData)=>{                   
                    
                    res.send({
                        success: true,
                        status: 202,
                        message: "data Updated",
                        data: savedData
                    })
                })
                .catch((err)=>{
                    res.send({
                        success: true,
                        status: 202,
                        message: "data not Updated",
                        data: err
                    })
                })
                }
                else {
                    res.send({
                        success: true,
                        status: 202,
                        message: "data not Found"
                    })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 404,
                    message: "data not Found"

                })
            })
    }
}
module.exports = {
    add, getAll, getOne, deleteOne, updateOne
}
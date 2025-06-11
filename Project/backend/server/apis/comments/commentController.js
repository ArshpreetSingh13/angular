const commentModel = require("./commentModel")


let add = (req, res) => {

    errMsg = []
    if (!req.body.PostId) {
        errMsg.push("PostId is require")
    }
    if (!req.body.text) {
        errMsg.push("text is require")
    }
    if (!req.body.commentBy) {
        errMsg.push("commentBy is require")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 202,
            message: errMsg
        })
    }
    // else{
    //     commentModel.findOne({ PostId })
    //     .then((Exist)=>{
    //         if(Exist==null){

    //             const NewComment= new commentModel

    //             NewComment.PostId = req.body.PostId
    //             NewComment.text = req.body.text
    //             NewComment.commentBy = req.body.commentBy

    //             NewComment.save()
    //             .then((savedData)=>{
    //                 res.send({
    //                     success: true,
    //                     status: 201,
    //                     message: "Post Added",
    //                     data: savedData
    //                 })
    //             })
    //             .catch(()=>{
    //                 res.send({
    //                     success: false,
    //                     status: 402,
    //                     message: "Post Not Saved"
    //                 })
    //             })
    //         }
    //         else{
    //             res.send({
    //                 success:false,
    //                 status:402,
    //                 message:"Post Already exists"
    //             })
    //         }
    //     })
    //     .catch(()=>{
    //         res.send({
    //             success: false,
    //             status: 402,
    //             message: "Internal Server Error"
    //         })
    //     })
    // }

    else {
        const NewComment = new commentModel

        NewComment.PostId = req.body.PostId
        NewComment.text = req.body.text
        NewComment.commentBy = req.body.commentBy

        NewComment.save()
            .then((savedData) => {
                res.send({
                    success: true,
                    status: 201,
                    message: "Comment Added",
                    data: savedData
                })
            })
            .catch(() => {
                res.send({
                    success: false,
                    status: 402,
                    message: "Comment Not Saved"
                })
            })

    }
}


let all = (req, res) => {
    commentModel.find()
        .populate("PostId")
        .populate("commentBy")
        .then((AllData) => {
            if (AllData == null) {
                res.send({
                    success: false,
                    status: 202,
                    message: "data not found"
                })
            }
            else {
                res.send({
                    success: true,
                    status: 201,
                    message: "data  found",
                    data: AllData
                })
            }
        })
        .catch(() => {
            res.send({
                success: false,
                status: 500,
                message: "Internal server error"
            })
        })

}

let getOne = (req, res) => {

    let errMsg = []

    if (!req.body._id) {
        errMsg.push("Id is required")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 202,
            message: errMsg
        })
    }

    else {
        commentModel.findOne({ _id: req.body._id })
            .populate("PostId")
            .populate("commentBy")
            .then((Data) => {
                if (Data == null) {
                    res.send({
                        success: false,
                        status: 209,
                        message: "Data not Found"
                    })
                } else {
                    res.send({
                        success: true,
                        status: 209,
                        message: Data
                    })
                }
            })
            .catch(() => {
                res.send({
                    success: false,
                    status: 209,
                    message: "Internal server Error"
                })
            })
    }
}


let deleteOne = (req, res) => {

    let errMsg = []

    if (!req.body._id) {
        errMsg.push("Id is required")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 202,
            message: errMsg
        })
    }

    else {
        commentModel.findOne({ _id: req.body._id })

            .then((Data) => {
                if (Data == null) {
                    res.send({
                        success: false,
                        status: 209,
                        message: "Data not Found"
                    })
                } else {
                    Data.status = !Data.status
                    Data.save()
                        .then((DeletedData) => {
                            res.send({
                                success: true,
                                status: 209,
                                message: DeletedData
                            })
                        })
                        .catch(() => {
                            res.send({
                                success: false,
                                status: 209,
                                message: "Item Not Deleted"
                            })
                        })

                }
            })
            .catch(() => {
                res.send({
                    success: false,
                    status: 500,
                    message: "Internal server Error"
                })
            })
    }
}

let UpdateOne = (req, res) => {

    let errMsg = []

    if (!req.body._id) {
        errMsg.push("Id is required")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 202,
            message: errMsg
        })
    }

    else {
        commentModel.findOne({ _id: req.body._id })
            .then((Data) => {
                if (Data == null) {
                    res.send({
                        success: false,
                        status: 209,
                        message: "Data not Found",
                        data:Data
                    })
                }
                else {
                    if (req.body.text) {
                        Data.text = req.body.text
                    }
                    Data.save()
                        .then((UpdatedData) => {
                            res.send({
                                success: true,
                                status: 209,
                                message: UpdatedData
                            })
                        })
                        .catch(() => {
                            res.send({
                                success: false,
                                status: 209,
                                message: "Item Not Updated"
                            })
                        })

                }
            })
            .catch(() => {
                res.send({
                    success: false,
                    status: 500,
                    message: "Internal server Error"
                })
            })
    }
}

module.exports = {
    add, all, getOne, deleteOne, UpdateOne
}
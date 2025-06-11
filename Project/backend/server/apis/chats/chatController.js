const chatModel = require("./chatModel")

let add = (req, res) => {

    let errMsg = []
    if (!req.body.userId1) {
        errMsg.push("userId1 is required")
    }
    if (!req.body.userId2) {
        errMsg.push("userId2 is required")
    }
    if (!req.body.message) {
        errMsg.push("message is required")
    }
    if (!req.body.sendBy) {
        errMsg.push("sendBy is required")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 402,
            message: errMsg
        })

    }
    else {
        chatModel.findOne({ title: req.body.title })


        let newChat = new chatModel()
        newChat.userId1 = req.body.userId1
        newChat.userId2 = req.body.userId2
        newChat.message = req.body.message
        newChat.sendBy = req.body.sendBy



        newChat.save().then((savedData) => {
            res.send({
                success: true,
                status: 201,
                message: savedData
            })
        }).catch((err) => {
            res.send({
                success: false,
                status: 409,
                message: "Unable to send message",
                data: err

            })
        })

    }


}

let getAll = (req, res) => {

    chatModel.find()
        .populate("userId1")
        .populate("userId2")
        .populate("sendBy")
        .then((AllData) => {
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



        chatModel.findOne({ _id: req.body._id })
            .populate("userId1")
            .populate("userId2")
            .populate("sendBy")
            .then((AllData) => {
                if (AllData) {
                    res.send({
                        success: true,
                        status: 202,
                        message: "data Found",
                        data: AllData
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
        chatModel.findOne({ _id: req.body._id })

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

module.exports = {
    add, getAll, getOne, deleteOne
}
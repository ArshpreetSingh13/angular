const compitionModel = require("./compitionModel")


let add = (req, res) => {

    errMsg = []
    if (!req.body.task) {
        errMsg.push("task is require")
    }
    if (!req.body.userId1) {
        errMsg.push("userId1 is require")
    }
    if (!req.body.userId2) {
        errMsg.push("userId2 is require")
    }
    if (!req.body.user1OP) {
        errMsg.push("user1OP is require")
    }
    if (!req.body.user2OP) {
        errMsg.push("user2OP is require")
    }
    if (!req.body.Winner) {
        errMsg.push("Winner is require")
    }
    if (!req.body.user1Time) {
        errMsg.push("user1Time is require")
    }
    if (!req.body.user2Time) {
        errMsg.push("user2Time is require")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 202,
            message: errMsg
        })
    }
    else{

        const newAnswer = new compitionModel

        newAnswer.task = req.body.task
        newAnswer.userId1 = req.body.userId1
        newAnswer.userId2 = req.body.userId2
        newAnswer.user1OP = req.body.user1OP
        newAnswer.user2OP = req.body.user2OP
        newAnswer.Winner = req.body.Winner
        newAnswer.user1Time = req.body.user1Time
        newAnswer.user2Time = req.body.user2Time
        
        newAnswer.save()
            .then((savedData) => {
                res.send({
                    success: true,
                    status: 201,
                    message: "Answer Added",
                    data: savedData
                })
            })
            .catch(() => {
                res.send({
                    success: false,
                    status: 402,
                    message: "Answer Not Saved"
                })
            })
    }

   
}


let all = (req, res) => {
    compitionModel.find()
        .populate("userId1")
        .populate("userId2")
        .populate("Winner")
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
        compitionModel.findOne({ _id: req.body._id })
            .populate("userId1")
            .populate("userId2")
            .populate("Winner")       
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
        compitionModel.findOne({ _id: req.body._id })

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

// let UpdateOne = (req, res) => {

//     let errMsg = []

//     if (!req.body._id) {
//         errMsg.push("Id is required")
//     }

//     if (errMsg.length > 0) {
//         res.send({
//             success: false,
//             status: 202,
//             message: errMsg
//         })
//     }

//     else {
//         compitionModel.findOne({ _id: req.body._id })
//             .then((Data) => {
//                 if (Data == null) {
//                     res.send({
//                         success: false,
//                         status: 209,
//                         message: "Data not Found",
//                         data:Data
//                     })
//                 }
//                 else {
//                     if (req.body.code) {
//                         Data.code = req.body.code
//                     }
//                     Data.save()
//                         .then((UpdatedData) => {
//                             res.send({
//                                 success: true,
//                                 status: 209,
//                                 message: UpdatedData
//                             })
//                         })
//                         .catch(() => {
//                             res.send({
//                                 success: false,
//                                 status: 209,
//                                 message: "Item Not Updated"
//                             })
//                         })

//                 }
//             })
//             .catch(() => {
//                 res.send({
//                     success: false,
//                     status: 500,
//                     message: "Internal server Error"
//                 })
//             })
//     }
// }

module.exports = {
    add,
     all, 
     getOne, 
     deleteOne, 
    //  UpdateOne
}
const answerModel = require("./answerModel")


let add = (req, res) => {

    errMsg = []
    if (!req.body.PostID) {
        errMsg.push("PostID is require")
    }
    if (!req.body.code) {
        errMsg.push("code is require")
    }
    if (!req.body.output) {
        errMsg.push("output is require")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 202,
            message: errMsg
        })
    }
    else{
        answerModel.findOne({ code:req.body.code })
        .then((Exist)=>{
            if(Exist==null){

                const newAnswer= new answerModel

                newAnswer.PostID = req.body.PostID
                newAnswer.code = req.body.code
                newAnswer.output = req.body.output

                newAnswer.save()
                .then((savedData)=>{
                    res.send({
                        success: true,
                        status: 201,
                        message: "Answer Added",
                        data: savedData
                    })
                })
                .catch(()=>{
                    res.send({
                        success: false,
                        status: 402,
                        message: "Answer Not Saved"
                    })
                })
            }
            else{
                res.send({
                    success:false,
                    status:402,
                    message:"Answer Already exists"
                })
            }
        })
        .catch(()=>{
            res.send({
                success: false,
                status: 402,
                message: "Internal Server Error"
            })
        })
    }

   
}


let all = (req, res) => {
    answerModel.find()
        .populate("PostID")
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
        answerModel.findOne({ _id: req.body._id })
            .populate("PostID")       
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
        answerModel.findOne({ _id: req.body._id })

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
        answerModel.findOne({ _id: req.body._id })
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
                    if (req.body.code) {
                        Data.code = req.body.code
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
    add,
     all, 
     getOne, 
     deleteOne, 
     UpdateOne
}
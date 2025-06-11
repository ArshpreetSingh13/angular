const techModel=require("./techModel")
const {uploadImg} =require("../../utility/helper")

let add=(req,res)=>{

    errMsg=[]
    if (!req.body.name){
        errMsg.push("name is require")
    }
    if (!req.body.description){
        errMsg.push("description is require")
    }
    if (!req.file){
        errMsg.push("imsgr is require")
    }

    if(errMsg.length>0){
        
        res.send({
            success:false,
            status:402,
            message:errMsg
        })
        
    }
    else{
        
        techModel.findOne({ name :req.body.name})
        .then(async(Exist)=>{
            if(Exist==null){

                const newTech=new techModel()

                newTech.name=req.body.name
                newTech.description=req.body.description

                if(req.file){
                    try{
                        const url=await uploadImg(req.file.buffer)
                        
                        
                        newTech.image=url
                    }
                    catch{
                        res.send({
                            success:false,
                            status:409,
                            message:"Cloudinary error"
                        })
                    }
                }

                newTech.save()
                .then((savedData)=>{
                    res.send({
                        success:true,
                        status:201,
                        message:savedData
                    })
                })
                .catch(()=>{
                    res.send({
                        success: false,
                        status: 208,
                        message: "data Not saved"
                    })
                })
            }
        })
        
    }
    
}


let getAll=(req,res)=>{
    techModel.find()
    .then((allData)=>{
        if (allData==null){
            res.send({
                success:false,
                status:404,
                message: "Tech not Found",
              
            })
        }
        else{
            res.send({
                success: true,
                status: 202,
                message: "Tech Found",
                data: allData
            })
        }
    })
    .catch(()=>{
        res.send({
            success: false,
            status: 500,
            message: "Internal server Error",

        })
    })
}


let getOne=(req,res)=>{
    errMsg=[]

    if(!req.body._id){
        errMsg.push("Enter the Id first")
    }

    if(errMsg.length>0){
        res.send({
            success:false,
            status:202,
            message:errMsg
        })
    }
    else{
        techModel.findOne({_id:req.body._id})
        .then((TECH)=>{
            if(TECH==null){
                res.send({
                    success:false,
                    status:402,
                    message:"Data not Found"
                })
            }
            else{
                res.send({
                    success: true,
                    status: 200,
                    message: "Data  Found",
                    data:TECH
            
                })
            }

        })
        .catch(()=>{
            res.send({
                success: false,
                status: 402,
                message: "Internal server error"
            })
        })
    }
}



let deleteOne = (req, res) => {
    errMsg = []

    if (!req.body._id) {
        errMsg.push("Enter the Id first")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 202,
            message: errMsg
        })
    }
    else {
        techModel.findOne({ _id: req.body._id })
            .then((TECH) => {
                if (TECH == null) {
                    res.send({
                        success: false,
                        status: 402,
                        message: "Data not Found"
                      
                    })
                }
                else {

                    TECH.status=!TECH.status

                    TECH.save()
                    .then((deletedData)=>{
                        res.send({
                            success: true,
                            status: 200,
                            message: "Data Updated",
                            data: deletedData

                        })
                    })
                    .catch(()=>{
                        res.send({
                            success: false,
                            status: 402,
                            message: "Data Not Updated"
                            

                        })
                    })

                    
                }

            })
            .catch(() => {
                res.send({
                    success: false,
                    status: 402,
                    message: "Internal server error"
                })
            })
    }
}


let UpdateOne = (req, res) => {
    errMsg = []

    if (!req.body._id) {
        errMsg.push("Enter the Id first")
    }

    if (errMsg.length > 0) {
        res.send({
            success: false,
            status: 202,
            message: errMsg
        })
    }
    else {
        techModel.findOne({ _id: req.body._id })
            .then( async(TECH) => {
                if (TECH == null) {
                    res.send({
                        success: false,
                        status: 402,
                        message: "Data not Found"

                    })
                }
                else {

                    if (req.body.name) {
                        TECH.name=req.body.name
                    }
                    if (req.body.description) {
                        TECH.description=req.body.description
                       
                    }
                    if (req.file) {
                        if (req.file) {
                            try {
                                const url = await uploadImg(req.file.buffer)


                                TECH.image = url
                            }
                            catch {
                                res.send({
                                    success: false,
                                    status: 409,
                                    message: "Cloudinary error"
                                })
                            }
                        }
                    }
                

                    TECH.save()
                        .then((deletedData) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Data Updated",
                                data: deletedData

                            })
                        })
                        .catch(() => {
                            res.send({
                                success: false,
                                status: 402,
                                message: "Data Not Updated"


                            })
                        })


                }

            })
            .catch(() => {
                res.send({
                    success: false,
                    status: 402,
                    message: "Internal server error"
                })
            })
    }
}


module.exports={
    add, getAll, getOne, deleteOne, UpdateOne
}
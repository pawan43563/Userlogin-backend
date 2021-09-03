const sendResponse=({res,statusCode,message,data,error})=>{
    res.statusCode=statusCode;
    if(error){
        return res.json({
            message,
            error
        })
    }else{
        return res.json({
            message,
            data
        })
    }


}

module.exports=sendResponse
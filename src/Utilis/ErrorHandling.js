


//Error Handler
export const AsyncHandler =(API)=>{

    return (req,res,next)=>{
        API(req,res,next).catch((err)=>{
            console.log({Message:err})
            return next(new Error(err, { cause: 500 }))
        })
    }
}


export const GlobalErrorHandler =(err,req,res,next)=>{
   
        if(err){
            return res.status(err['cause']|| 500).json({message:err.message})
        }
    }

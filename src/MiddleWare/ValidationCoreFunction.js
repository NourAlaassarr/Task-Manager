//req-->userdata
//schema=> api schema

const reqMethods=['body','query','params','headers','file','files'];

export const ValidationCoreFunction =(Schema)=>{
    return (req,res,next)=>{
        //req
        const ErrorList=[];
        for (const key of reqMethods) {
            if(Schema[key]){
                const ValidationResults=Schema[key].validate(req[key],{abortEarly:false});
                if(ValidationResults.error){
                    ErrorList.push(ValidationResults.error.details)
                }
            }
            
        }
        if(ErrorList.length){
            return res.status(400).json({Message:'Validation Error',ErrorList})
        }
        next();
    }
}
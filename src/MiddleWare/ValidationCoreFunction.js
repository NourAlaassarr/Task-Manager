//req-->userdata
//schema=> api schema
import joi from 'joi';
const reqMethods=['body','query','params','headers','file','files'];

import { Types } from 'mongoose';


const objectId = (value, helpers) => {
    if (!Types.ObjectId.isValid(value)) {
      return helpers.message('Invalid ID format');
    }
    return value;
  };
export const generalFields={
    Email: joi
    .string()
    .email({ tlds: { allow: ['com', 'net', 'org'] } })
    .required(),
    Password: joi
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .messages({
    'string.pattern.base': 'Password regex fail',
    }).required(),
    _id: joi.string().custom(objectId, 'ObjectId validation')
}


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
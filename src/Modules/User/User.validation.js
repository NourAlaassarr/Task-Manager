import Joi from "joi";

export const SignUp ={
    body:Joi.object({
        UserName:Joi.string().min(4).max(20),
        Password:Joi
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .messages({
        'string.pattern.base': 'Password regex fail',
        }).required(),

        ConfirmPassword:Joi.valid(Joi.ref('Password')).required(),

        Email:Joi
        .string()
        .email({ tlds: { allow: ['com', 'net', 'org'] } })
        .required(),
        Age:Joi.number().min(10),

    }).required().options({presence:'required'})
}

export const SignIn ={
    body:Joi.object({
    
        Password:Joi
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .messages({
        'string.pattern.base': 'Password regex fail',
        }).required(),

        Email:Joi
        .string()
        .email({ tlds: { allow: ['com', 'net', 'org'] } })
        .required(),

    }).required()
}


export const SignOut ={
    headers:Joi.object({
        token:Joi.string().required()
    }).options({allowUnknown:true})
}
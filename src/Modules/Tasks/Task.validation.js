import Joi from "joi";
import { generalFields } from "../../Middleware/ValidationCoreFunction.js";

export const AddTask = {
    body: Joi.object({
        Title: Joi.string().min(4).max(20).required(),
        Description: Joi.string().min(4).max(100).optional(),
        DeadLine: Joi.date()
    }).required(),

    headers: Joi.object({
        token: Joi.string().required()
    }).options({ allowUnknown: true })
};


export const UpdateTask = {

    params: Joi.object({
        TaskId: generalFields._id
    }).required(),

    body: Joi.object({
        Title: Joi.string().min(4).max(20).optional(),
        Description: Joi.string().min(4).max(100).optional(),
        DeadLine: Joi.date().optional(),
        Status: Joi.string().valid('completed', 'incomplete').optional()
    }),
    headers: Joi.object({
        token: Joi.string().required()
    }).options({ allowUnknown: true })
};

export const Delete = {

    params: Joi.object({
        TaskId: generalFields._id
    }).required(),

    headers: Joi.object({
        token: Joi.string().required()
    }).options({ allowUnknown: true })
};

export const querySchema = {
query:Joi.object({
    filter: Joi.string().optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().valid('asc', 'desc').optional(),
    search: Joi.string().optional(),
    fields: Joi.string().optional(),
    Status: Joi.string().valid('completed', 'incomplete').optional(),
  }),
  headers: Joi.object({
    token: Joi.string().required()
}).options({ allowUnknown: true })
}
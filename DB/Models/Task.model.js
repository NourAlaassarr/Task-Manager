import mongoose, { Schema, SchemaTypes } from "mongoose";

import { SystemRoles } from '../../src/Utilis/System.Roles.js';


const TaskSchema = new Schema({
    Title: {
        lowercase: true,
        type: String,
        required: true
    },
    Description: {
        type: String,
    },
    Status: {
        type: String,
        enum: [SystemRoles.Incomplete, SystemRoles.Completed],
        default: SystemRoles.Incomplete,
        lowercase:true
    },
    UserId:{
        ref:'user',
        type:SchemaTypes.ObjectId,
        required:true,
    },
    DeadLine:{
        type:Date,
        default:Date.now
    }

}, { timestamps: true })

export const TaskModel = mongoose.model('task', TaskSchema)
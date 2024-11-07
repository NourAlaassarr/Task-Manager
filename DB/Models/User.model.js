import mongoose, { Schema } from "mongoose";

import { SystemRoles } from '../../src/Utilis/System.Roles.js';

const UserSchema = new Schema({
    UserName: {
        lowercase: true,
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: String,
    Status: {
        type: String,
        enum: [SystemRoles.Offline, SystemRoles.Online],
        default: SystemRoles.Offline
    },
    Role:{
        type: String,
        enum: [SystemRoles.Admin, SystemRoles.User],
        default: SystemRoles.User
    },

    IsConfirmed: {
        type: Boolean,
        default: false
    },
    Token: {
        type: String,
    },
    Code: String,
    Age: Number,

}, { timestamps: true,
    toJSON:{virtuals:true},
    toObject:{
        virtuals:true
    },
 })

// UserSchema.virtual('Tasks',{
//     ref:'task',
//     localField:'_id',
//     foreignField:'UserId'
//      })
    
export const UserModel = mongoose.model('user', UserSchema)
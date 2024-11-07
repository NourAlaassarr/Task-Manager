import { UserModel } from "../../../DB/Models/User.model.js"

import pkg from 'bcrypt'
import { GenerateToken, verifyToken} from "../../Utilis/TokenFunction.js";
import {SendEmailService} from '../../Service/SendEmailService.js'
import { emailTemplate } from "../../Utilis/EmailTemplate.js";
import { SystemRoles } from "../../Utilis/System.Roles.js";


//Sign up
export const SignUp = async (req, res, next) => {
    const { UserName, Password, ConfirmPassword, Age, Email } = req.body

    const EmailChecking = await UserModel.findOne({ Email })
    if (EmailChecking) {
        return next(new Error('User Already Exists', { cause: 400 }));
    }
    if (Password !== ConfirmPassword) {
        return next(new Error("Passwords don't match", { cause: 400 }));
    }
    const newEmailToken = GenerateToken({
        payload: {
            Email,
        },
        signature: process.env.CONFIRM_EMAIL_TOKEN,
        expiresIn: '1h',
    })

    const ConfirmLink = `http://${req.headers.host}/User/ConfirmEmail/${newEmailToken}`;

    const isEmailSent = SendEmailService({
        to: Email,
        subject: 'Confirmation Email',
        message: emailTemplate({
            link: ConfirmLink,
            linkData: 'Click here to Confirm',
            subject: 'Confirmation Email'
        })
    })

    if (!isEmailSent) {
        return res.status(500).json({ Message: "Please try again later or contact support team" });
    }
    const hashedPass =pkg.hashSync(Password,+process.env.SALT_ROUNDS);

    const UserData = new UserModel({
        UserName,
        Email,
        Password: hashedPass,
        Age,
    });

    await UserData.save();
    return res.status(201).json({ Message: "Success" });

}


//signIn
export const SignIn = async (req,res,next)=>{
    const {Email,Password}=req.body
    const EmailChecking = await UserModel.findOne({Email});
    if(!EmailChecking){
        return next(new Error ('User Not Found,Please SignUp',{cause:400}));
    }
    const encoded = pkg.compareSync(Password, EmailChecking.Password)
            if(!encoded){
                return next(new Error ('Invalid credentials',{cause:400}));
            }
            const UserToken = GenerateToken({
                payload:{
                    Email:EmailChecking.Email,
                    _id:EmailChecking._id,
                    
                },
                signature:process.env.SIGN_IN_TOKEN,
                expiresIn:'1h',
                
            });
            if(!UserToken){
                return next(new Error ('Token Generation Failed ! Payload can not be empty',{cause:400}));
                
            }

            EmailChecking.Token=UserToken;
            EmailChecking.Status=SystemRoles.Online;
            const Data = await EmailChecking.save();
            return res.status(200).json({Message:'Success', data:Data.Token});
        
}

//signOut
export const SignOut = async (req,res,next)=>{
    const UserId = req.AuthUser
    const CheckUser = await UserModel.findByIdAndUpdate(UserId,{Status:SystemRoles.Offline})
    if(!CheckUser){
        return next(new Error ('Error!',{cause:400}));
    }
    res.status(200).json({Message:'Logged Out Successfuly'});
}

//Confirm Email
export const ConfirmEmail = async(req,res,next)=>{
    const{Token}=req.params;
    
    let DecodedToken = verifyToken({token:Token, signature:process.env.CONFIRM_EMAIL_TOKEN});
   
    const Isconfirmcheck = await UserModel.findOne({Email:DecodedToken.payload.Email});
    if(Isconfirmcheck.IsConfirmed==true){
        return res.status(400).json({Message:'Already Confirmed'});
    }
    const CheckDecoded = await UserModel.findOneAndUpdate({Email:DecodedToken.Email,IsConfirmed:true});
    
    return res.status(200).json({Message:'Success'});
    

}




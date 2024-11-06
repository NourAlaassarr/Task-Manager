
import jwt  from 'jsonwebtoken';
import { UserModel } from '../../DB/Models/User.model.js';
import { GenerateToken, verifyToken } from './../Utilis/TokenFunction.js';



 export const IsAuth=()=>{
    return async(req,res,next)=>{
        try{

        const {token} = req.headers;
        console.log(token)
        if(!token){
            return res.status(400).json({Message:"Please Log in first"});
        }
        try {
            //  const DecodedData =jwt.verify(Token,process.env.SIGNINTOKEN)

        const DecodedData= verifyToken({token,signature:process.env.SIGN_IN_TOKEN})
        // if(!DecodedData || !DecodedData._id){
        //     return res.status(400).json({Message:"Invalid Token"});
        // }
        console.log("id",DecodedData)
        const FindUser = await UserModel.findById(DecodedData.payload._id);
        if(!FindUser){
            return res.status(400).json({Message:"Please Sign Up"}); 
        }

        req.AuthUser=FindUser;
        next();
        } catch (error) {
            //token to search
            if(error=='TokenExpiredError: jwt expired'){
                const userToken = await UserModel.findOne({Token:token});
                if(!userToken){
                    return next(new Error('Token Doesn\'t Exists'),{cause:400}); 
            }
            //generate Token
            const NewUserToken = GenerateToken({
                payload:{Email:userToken.Email,
                    _id:userToken._id,},
                    signature:process.env.SIGN_IN_TOKEN,
                    expiresIn:'1h',
            })
            userToken.Token=NewUserToken;
            const newToken=await userToken.save();
            return res.status(200).json({Message:'Token Generated',newToken});
        }
            
            return next(new Error(' Invalid Token'),{cause:500});
        }
    }catch(err){
        console.log(err);
        return next(new Error('Error in Auth'),{cause:500});
}
    }
}



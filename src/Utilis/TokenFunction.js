import jwt from "jsonwebtoken";




export const GenerateToken=({
    payload={},
    signature=process.env.DEFAULT_TOKEN_SIGN_IN,
    expiresIn ='1h',
}={})=>{
//check if payload is empty
if(!Object.keys(payload).length){
return false;
}
const Token = jwt.sign({payload},signature,{
    expiresIn
});
return Token;
}


export const verifyToken=({
    token='',
    signature=process.env.DEFAULT_TOKEN_SIGN_IN
}={})=>{
    if(!token){
        return false;
        }
    const data = jwt.verify(token,signature);
    return data;

}
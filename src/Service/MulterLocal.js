import multer from "multer";
import { customAlphabet } from 'nanoid';
import fs from 'fs'
import path from 'path'

const nanoid = customAlphabet('1234567890abcdefz+=-', 6)


export const multerFunction =(allowedExtensionsArr,customPath)=>{
if(!allowedExtensionsArr){
    allowedExtensionsArr=['image/png','image/jpeg','image/jpg']
}
if(!customPath){
    customPath='General'
}

    const destpath =path.resolve(`upload/${customPath}`)
    if(!fs.existsSync(destpath)){
        fs.mkdirSync(destpath,{recursive:true})
    }
    //file name =>storage
    const storage =multer.diskStorage({
           //destination
        destination:function (req, file, cb) {
            
            cb(null, destpath)
        },
        filename: function(req,file,cb){
            cb(null, file.originalname+nanoid())
        }
    })

    //file filter
    const fileFilter = function(req,file,cb){
        if(allowedExtensionsArr.includes(file.mimetype)){
            cb(null,true)
    }
    cb(new Error('Invalid file type'),{cause:400},false)
    }
const fileUpload = multer({ fileFilter,storage});
return fileUpload
} 
import nodemailer from 'nodemailer'


export async function SendEmailService({
    to,
    subject,
    message,
    attachments=[]
}={}){

    const Transporter =nodemailer.createTransport({
        host:'localhost',
        port:587,
        secure:false,
        service:'gmail',
        auth:{
            user:'itsalaassar@gmail.com',
            pass:'lhur dxim chhv kpxz'
        },
        tls:{
            rejectUnauthorized:false
        }
        });
        const emailInfo = Transporter.sendMail({
            from:'"Teams-App"<itsalaassar@gmail.com>',
            to:to? to: 'Nonaalaassar@gmail.com',
            subject:subject ? subject : 'No Subject',
            html:message?message:'No Message',
            attachments,
            

        })
        if((await emailInfo).accepted.length){
            return true;
        }
        return false;
    

}
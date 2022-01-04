const nodemailer = require('nodemailer');

const SendMail = async (email, subject, text) =>{
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "3cff062ac963ac",
              pass: "57a05936fe0a3c"
            }
          });
          await transporter.sendMail({
              from:  "3cff062ac963ac",
              to : email,
              subject: subject,
              text: text
          });
          console.log('email sent successfully')
    }catch(err){
        console.log(error+" email not sent")
    }
}
module.exports = SendMail;
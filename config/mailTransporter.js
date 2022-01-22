const smtpTransport = require('nodemailer-smtp-transport');
//setup nodemailer
const nodemailer = require('nodemailer');
const mailTransporter=nodemailer.createTransport(smtpTransport({    
        service: 'gmail',
        host: 'smtp.gmail.com', 
        auth: {        
            user: 'tipson664@gmail.com',        
            pass: 'liwhxiuhvprsdyac'    
        }
}));

module.exports=mailTransporter
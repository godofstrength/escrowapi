const smtpTransport = require('nodemailer-smtp-transport');
//setup nodemailer
const nodemailer = require('nodemailer');
const mailTransporter=nodemailer.createTransport(smtpTransport({    
        service: 'gmail',
        host: 'smtp.gmail.com', 
        auth: {        
            user: 'email@gmail.com',        
            pass: 'your app password' //check how to setup gmail app password    
        }
}));

module.exports=mailTransporter
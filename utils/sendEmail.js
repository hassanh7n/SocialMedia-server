const nodemailer = require('nodemailer');
const nodeMaileconfig = require('./nodemailerConfig');



const sendEmail = async({to, subject, html}) => {
    let testAccount = await nodemailer.createTestAccount();




    const transporter = nodemailer.createTransport(nodeMaileconfig);


    return transporter.sendMail({
        from : '"SHaheen-Wheels" <foo@example.com>',
        to,
        subject,
        html
    })

}

module.exports = sendEmail
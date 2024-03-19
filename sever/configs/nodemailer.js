// "use strict";
const nodemailer = require("nodemailer");
// const { promises } = require("nodemailer/lib/xoauth2");
require('dotenv')
const transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
});

const randomNumber = ()=>{
 return  (Math.floor(Math.random()*900000)+100000)
}
 function sendMail(email) {
  let otp = randomNumber()
  return new Promise((resolve,reject)=>{
  const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    from:"Mafoil",
    to:email,
    subject: 'Reset Password',
    text: '',
    html: `<!DOCTYPE html>
    <html lang="en" >
    <head>
      <meta charset="UTF-8">
      <title>CodePen - OTP Email Template</title>
    </head>
    <body>
    <!-- partial:index.partial.html -->
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4rem;color: black;text-decoration:none;font-weight:600">MAFOIL</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Mafoil. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
        <img width="100%" style="margin-bottom: 12px;" src="https://wpbingosite.com/wordpress/mafoil/wp-content/uploads/2023/01/sign-in.jpg" alt="mafoil"></img>
        <h2 style="background: black;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        </div>
      </div>
    </div>
    <!-- partial -->
      
    </body>
    </html>`,
}
    transporter.sendMail(mainOptions,(err,info)=>{
    if(err){
      reject({message:"Send Mail Failed"})
    }else{
      resolve({message:"Send Mail Success",codeOtp:otp,email})
    }
  });
})
}

module.exports = sendMail
import express from 'express';
import nodemailer from 'nodemailer';
import fs from 'fs';

const app = express.Router();


const mailer = () => {
    return {
        send_otp_mail() {
            return new Promise((resolve, reject) => {
                const welcomeLetterHTML = fs.readFileSync('welcome-template.html', 'utf-8');
                let otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                let sender = "codebuddysync@gmail.com";
                // let text = `Dear User, the verification code for GeniePlay authentication is ${otp}`;
                let subject = "Greetings! from CodeBuddySync";
                var email = "priyanshukr449@gmail.com";
                const start = new Date();
                const msg = {
                    from: sender,
                    to: email,
                    subject: subject,
                    // text: text,
                    html: welcomeLetterHTML
                };
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: sender,
                        pass: "cuoxmwypdlceucfc"
                    },
                    port: 465,
                    host: "smtp.gmail.com",
                });

                transporter.sendMail(msg, (err) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        const stop = new Date();
                        const req_sec = `${(stop - start)/1000} seconds..`;
                        const json_mail = {
                            status: true,
                            email_sent_to: email,
                            email_from: sender,
                            in_time: req_sec,
                            otp: otp.toString()
                        };
                        resolve(json_mail);
                        console.log(json_mail);
                    }
                });
            });
        },

        check_mail(x) {
            return "hello";
        }
    };
};

// Call send_otp_mail and log the result
mailer().send_otp_mail().then((res) => {
    console.log(res);
}).catch((err) => {
    console.error(err);
});

// // Call check_mail and log the result
// const result = mailer().check_mail("kshjkd");
// console.log(result);







// mailer().check_mail("kshjkd").then(res=>{
//     console.log(res);
// })

// export default app;
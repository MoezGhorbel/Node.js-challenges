const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.pass
    }
});

exports.sendemail = async (req, res) => {
    try {
        let info = ({
            from: "moez <req.body.email>",
            to: "receiver @gmail.com",
            subject: "test email",
            //using text:
            // text : "text"
            //using html:
            html: "<h1>HTML</h1>"
        });
        await transporter.sendMail(info, function (error, success) {
            if (error) {
                res.status(500).send({ message: "server error" });
            } else {
                res.status(200).send({ message: "email sent successfully" });
            }
        })
    } catch (error) {
        res.status(500).send({ message: "transporter error" });
    }
};

exports.sendemailhtml = async (req, res) => {
    try {
        const filePath = path.resolve("./views/email.html");
        const template = fs.readFileSync(filePath, { encoding: "utf-8" });
        const option = { name: "receiver" };
        const render = ejs.render(template, option);
        let info = ({
            from: "moez <req.body.email>",
            to: "receiver @gmail.com",
            subject: "Test email",
            html: render,
            attachments: [{
                filename: "Text.txt",
                content: "Test attachement in email"
            }],
        });
        await transporter.sendMail(info, function (error, success) {
            if (error) {
                res.status(500).send({ message: "server error" });
            } else {
                res.status(200).send({ message: "email sent successfully" });
            }
        })
    } catch (error) {
        res.status(500).send({ message: "transporter error" });
    }
};
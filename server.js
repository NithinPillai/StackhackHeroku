const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const log = console.log;
const app = express();
require("dotenv").config();
app.use(express.static('website'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.listen(PORT, () => log(`Server is starting on PORT ${PORT}`));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on ${ PORT }`);
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});



function sendEmail(mail) {
    var mailOptions = {
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        html: mail.body
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email: ' + info.response);
        }
    });
}

app.post('/email', (req, res) => {

    let mail = {
        from: process.env.EMAIL,
        to: req.body.to_address,
        subject: 'Your Registration is Complete',
        body: `Hello ${req.body.name}! We heard that you are interested in learning how to code. Here is the link to our ${process.env.DISCORD_LINK}; we'll be waiting!`
    };

    sendEmail(mail);
    res.redirect('/');

    //Send an email here but currently dummy email
    console.log('Data:', req.body);
    res.json({ message: 'Message received!' })
});






app.post('/contactEmail', (req, res) => {
    const transporterC = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });


    const mailDats = {
        from: req.body.emailC,
        to: process.env.EMAIL,
        subject: `Message from ${req.body.emailC}: ${req.body.subjectC}`,
        text: req.body.messageC
    }

    transporterC.sendMail(mailDats, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email: ' + info.response);
        }
    });
    res.redirect('/');
});
require('dotenv').config();

const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, phone, text, cb) => {

    const mailOptions = {
        from: email,
        to: 'info@conquestcleaning.ca',
        subject: 'Contact Request',
        text: text,
        html: `<b>Name:</b> ${name}<br><br><b>Phone:</b> ${phone}<br><br>${text}`
    };
    
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
};

module.exports = sendMail;

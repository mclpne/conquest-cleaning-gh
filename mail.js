const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: 'key-98a6e81a7b2662418a05b32f1c610d5d',
        domain: 'sandbox50f005d42ab24377b4a8da767419aae4.mailgun.org'
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

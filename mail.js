const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: 'YOUR_KEY_HERE',
        domain: 'YOUR_DOMAIN_HERE'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, phone, text, cb) => {

    const mailOptions = {
        from: email,
        to: 'YOUR_EMAIL_HERE',
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

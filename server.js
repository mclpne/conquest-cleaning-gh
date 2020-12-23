require('dotenv').config(); // try deleting this line? wtf knows
const express = require('express');
const sendMail = require('./mail.js');
const app = express();
const path = require('path');

const PORT = 8080;

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use('/css', express.static('css'))

app.post('/email', (req, res) => {
    const {name, email, phone, text} = req.body;
    console.log('Data: ', req.body);
    
    sendMail(name, email, phone, text, function(err, data) {
        if (err) {
            console.log('ERROR: ', err)
            res.status(500).json({ message: 'Internal Error'});
        } else {
            res.json({ message: 'Email sent!'});
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.listen(PORT, () => console.log('Server is starting on PORT ', PORT));
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

// Express Setup
const app = express();
const portNum = 3000;

// Body Parser Setup
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// NodeMailer Setup
var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bhpress@gmail.com',
        pass: 'password'
    }
});

// NodeMailer API Call
app.post('/send', (req, res) => {
    console.log(req.body);
    /*const mailOptions = {
        from: 'bhpress@gmail.com',
        to: 'jeff@email.com',
        subject: 'Subject including client name',
        html: '<p>Body text and image if there.</p>'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            // Send error to screen giving Jeff's email
        } else {
            console.log(info);
            // Send success message to screen
        }
    });*/
});

// Serving static files and setting home page
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Start server
app.listen(portNum, () => {
    console.log(`Server started on port ${portNum}`);
});
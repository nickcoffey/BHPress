const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

// Express Setup
const app = express();
const portNum = process.env.PORT || 8080; // for Heroku
// const portNum = 3000; // for local

// Body Parser Setup
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// NodeMailer Setup
var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bhpresssite@gmail.com',
        pass: 'printing123'
    }
});

// NodeMailer API Call
app.post('/send-email', (req, res) => {
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    const mailOptions = {
        from: 'bhpresssite@gmail.com',
        to: 'njc3n3@gmail.com',
        subject: 'Subject including client name',
        html: `<h2>Body text and image if there.</h2><p>${req.body.details}</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send(JSON.stringify({ msg: 'Failure' }));
            console.log(error);
            // Send error to screen giving Jeff's email
        } else {
            res.send(JSON.stringify({ msg: 'Success' }));
            console.log(info);
            // Send success message to screen
        }
    });
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
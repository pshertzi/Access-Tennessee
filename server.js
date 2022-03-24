const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// View engine setup

app.set('view engine', 'html');
app.engine('handlebars', require('exphbs').__express);

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/landing-page/index.html'))
});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.google.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'tanyaleedev@gmail.com', // generated ethereal user
        pass: 'process.env.E_PASSWORD'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Access Tennessee Contact" <tanyaleedev@gmail.com>', // sender address
      to: 'tanyaleepr@gmail.com', // list of receivers
      subject: 'AT Submission Receipt', // Subject line
      text: 'Thanks for your submission. We will contact you shortly! ', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent.'});
  });
  });

app.listen(3000, () => console.log('Server started...'));
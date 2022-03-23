//These are for nodemailer requirements
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
    <p>Thank you for your submission. We will contact you shortly!</p>
    <h3>This is your receipt details:</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Your message:</h3>
    <p>${req.body.message}</p>
    <p> DO NOT REPLY TO THIS MESSAGE. Thank you! </p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'ca2765889d2d23', // generated ethereal user // Mailtrap
        pass: '0b9ea155e5e3cb'  // generated ethereal password // Mailtrap
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Access Tennessee" <tanyaleedev@gmail.com', // sender address
      to: 'RECEIVEREMAILS', // list of receivers
      subject: 'AT Contact Receipt', // Subject line
      text: 'Submission Completed', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent!'});
  });
  });

app.listen(3000, () => console.log('Server started...'));
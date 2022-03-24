const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser'); //added for nodemail
const nodemailer = require('nodemailer'); //added for nodemail
require('dotenv').config(); //added for nodemail

const app = express();
const PORT = process.env.PORT || 3001;

// turn on routes
app.use(routes);



const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers'));

// View engine setup for nodemail

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/landing-page/index.html'))
});

app.post('/send', (req, res) => {
  console.log(req.body)
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.msg}</p>
  `;

  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ca2765889d2d23",
      pass: "0b9ea155e5e3cb"
    }
  });
  // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: 'mail.google.com',
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //       user: 'tanyaleedev@gmail.com', // generated ethereal user
  //       pass: process.env.E_PASSWORD  // generated ethereal password
  //   },
  //   tls:{
  //     rejectUnauthorized:false
  //   }
  // });

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
  
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}!`));
});

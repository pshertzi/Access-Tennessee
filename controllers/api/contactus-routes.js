// //get the form by its id
// app.post("/send", (req, res) => {
//     //1.
//     let form = new multiparty.Form();
//     let data = {};
//     form.parse(req, function (err, fields) {
//       console.log(fields);
//       Object.keys(fields).forEach(function (property) {
//         data[property] = fields[property].toString();
//       });
  
//       //2. You can configure the object however you want
//       const mail = {
//         from: "tanyaleedev@gmail.com", //should I add here the project name?
//         to: process.env.EMAIL,
//         subject: data.subject,
//         text: `${data.name} <${data.email}> \n${data.message}`,
//       };
  
//       //3.
//       transporter.sendMail(mail, (err, data) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send("Something went wrong.");
//         } else {
//           res.status(200).send("Email successfully sent to recipient!");
//         }
//       });
//     });
//   });


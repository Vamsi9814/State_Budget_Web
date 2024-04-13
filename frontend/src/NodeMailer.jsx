
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gvsvvs.22@gmail.com',
    pass: 'Gvsv2004'
  }
});

const emailTo = localStorage.getItem("email")

if(!emailTo) return;

var mailOptions = {
  from: 'gvsvvs.22@gmail.com',
  to: emailTo,
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
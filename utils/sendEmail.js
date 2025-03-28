import nodeMailer from "nodemailer";

const sendEmail = async (payload) => {
  const { email, subject, message } = payload;
  console.log(email, subject, message);
  const transporter = nodeMailer.createTransport({
    // host: "smtp.gmail.com",
    host: process.env.SMTP_HOST,
    // port: 587,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
    //   user: "amankumar.dev98@gmail.com",
      user: process.env.SMTP_MAIL,
    //   pass: "ffec gliw nzbg woyi",
      pass: process.env.SMTP_PASS
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    // from: "unibazarauth@gmail.com",
    to: email,
    subject: subject,
    html: message,
  };

  console.log(mailOptions,"mail")
  await transporter.sendMail(mailOptions);
};

export { sendEmail };

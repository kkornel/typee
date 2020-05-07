const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailAsync = (to, subject, html) => {
  const msg = {
    to: to,
    from: process.env.FROM_EMAIL,
    subject: subject,
    html: html,
  };

  sgMail.send(msg);
};

const sendEmailSync = async (to, subject, html) => {
  const msg = {
    to: to,
    from: process.env.FROM_EMAIL,
    subject: subject,
    html: html,
  };

  console.log(msg);

  try {
    const response = await sgMail.send(msg);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

module.exports = {
  sendEmailAsync,
  sendEmailSync,
};

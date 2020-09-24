const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sending async email (quicker response to user).
 * Doesn't wait for response.
 */
const sendEmailAsync = (to, subject, html) => {
  const msg = {
    to: to,
    from: process.env.FROM_EMAIL,
    subject: subject,
    html: html,
  };

  sgMail.send(msg);
};

/**
 * Sending sync email (longer).
 * Waits for response from Sendgrid.
 */
const sendEmailSync = async (to, subject, html) => {
  const msg = {
    to: to,
    from: process.env.FROM_EMAIL,
    subject: subject,
    html: html,
  };

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

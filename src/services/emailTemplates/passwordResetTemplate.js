module.exports = (username, url) => {
  return `
    <h4>Hello, ${username}!</h4>
    <p>Please click on the following <a href="${url}">link</a> to reset your password.</p> 
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
  `;
};

module.exports = (username, url) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Hello, ${username}!</h3>
          <p>Please confirm your email:</p>
          <div>
            <a href="${url}">Confirm!</a>
          </div>
          <p>See you!</p>
        </div>
      </body>
    </html>
  `;
};

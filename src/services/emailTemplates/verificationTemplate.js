module.exports = (username, url) => {
  return `
    <h4>Hello, ${username}!</h4>
    <p>Please click on the following <a href="${url}">link</a> to verify your account.</p> 
    <p>If you did not request this, please ignore this email.</p>
  `;
};
// module.exports = (username, url) => {
//   return `
//     <html>
//       <body>
//         <div>
//           <h3>Hello, ${username}!</h3>
//           <p>Please confirm your email:</p>
//           <div>
//             <a href="${url}">Confirm!</a>
//           </div>
//           <p>See you!</p>
//         </div>
//       </body>
//     </html>
//   `;
// };

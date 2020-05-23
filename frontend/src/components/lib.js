import React from 'react';
// import { FaSpinner } from 'react-icons/fa';
// const Spinner = styled(FaSpinner)({
//   animation: `${spin} 1s linear infinite`,
// });

// Spinner.defaultProps = {
//   'aria-label': 'loading',
// };

// function FullPageSpinner() {
//   return (
//     <div
//       style={{
//         fontSize: '4em',
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         animation: `1s linear infinite`,
//       }}
//     >
//       <FaSpinner />
//     </div>
//   );
// }

export default function FullPageSpinner({ size = 'default' }) {
  return <div>Loading...</div>;
}

export { FullPageSpinner };

import React from 'react';
import { Link } from 'react-router-dom';

export default function FourOhFour() {
  return (
    <div>
      <h2>Page not found.</h2>
      <p>The page you're looking could not be found.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}

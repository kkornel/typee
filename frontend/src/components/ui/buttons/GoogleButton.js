import React from 'react';

export default function GoogleButton() {
  return (
    <a className="btn btn-sm btn-go" href="/api/v1/auth/google">
      <i className="fa fa-google"></i> Continue with Google
    </a>
  );
}

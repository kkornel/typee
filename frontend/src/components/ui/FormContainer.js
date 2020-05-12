import React from 'react';

export default function FormContainer({ children }) {
  return (
    <div className="container col-sm-6 offset-sm-3 mt-3 block-content-borders">
      {children}
    </div>
  );
}

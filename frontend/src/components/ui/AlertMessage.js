import React from 'react';

export default function AlertMessage({ message, alertType }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className={`alert alert-${alertType}`} role="alert">
        {message}
      </div>
    </div>
  );
}

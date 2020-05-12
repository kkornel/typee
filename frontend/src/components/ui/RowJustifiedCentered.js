import React from 'react';

export default function RowJustifiedCentered({ children, className }) {
  return (
    <div className={`row justify-content-center ${className}`}>{children}</div>
  );
}

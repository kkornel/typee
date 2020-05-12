import React from 'react';

export default function PrimaryButton({ text }) {
  return (
    <button type="submit" className="btn btn-primary">
      {text}
    </button>
  );
}

import React from 'react';

export const gifRegex = /((<gif>)(.*)(<\/gif>))/;

export const processMessage = (text) => {
  const matches = text.match(gifRegex);

  return matches ? (
    <img
      src={matches[3]}
      style={{ marginTop: '4px' }}
      alt={`It is supposed to show GIPHY, but it doesn't!`}
    />
  ) : (
    text
  );
};

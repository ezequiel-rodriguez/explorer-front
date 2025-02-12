import React from 'react';

function ReturIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`w-6 h-5 ${className}`}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 7H10.5M3.5 7L6.41667 4.08333M3.5 7L6.41667 9.91667"
        strokeWidth="1"
      />
    </svg>
  );
}

export default ReturIcon;

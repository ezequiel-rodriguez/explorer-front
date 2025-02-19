import React from 'react';

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.66683 0.666748H1.66683C0.933496 0.666748 0.333496 1.26675 0.333496 2.00008V11.3334H1.66683V2.00008H9.66683V0.666748ZM11.6668 3.33341H4.3335C3.60016 3.33341 3.00016 3.93341 3.00016 4.66675V14.0001C3.00016 14.7334 3.60016 15.3334 4.3335 15.3334H11.6668C12.4002 15.3334 13.0002 14.7334 13.0002 14.0001V4.66675C13.0002 3.93341 12.4002 3.33341 11.6668 3.33341ZM11.6668 14.0001H4.3335V4.66675H11.6668V14.0001Z" />
    </svg>
  );
}

export default CopyIcon;

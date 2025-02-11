import React from "react";

function ArrowDownIcon({ className = "fill-white" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0552 6.8716L7.902 10.8091C7.76538 10.9458 7.60144 11.0005 7.4375 11.0005C7.27356 11.0005 7.10962 10.9458 6.973 10.8091L2.81982 6.8716C2.5739 6.62551 2.54658 6.21535 2.81982 5.96926C3.06573 5.69582 3.47558 5.66848 3.74882 5.94192L7.4375 9.44191L11.1262 5.94192C11.3994 5.66848 11.8093 5.69582 12.0552 5.96926C12.3284 6.21535 12.3011 6.62551 12.0552 6.8716Z"
        fill="#FBFBFB"
      />
    </svg>
  )
}

export default ArrowDownIcon;

import React from 'react';

function InternalLinkIcon({
  className = 'stroke-white-100',
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.41655 1.70866H4.54155C3.37477 1.70866 2.79095 1.70866 2.3453 1.93573C1.95329 2.13546 1.63481 2.45394 1.43508 2.84595C1.20801 3.2916 1.20801 3.87542 1.20801 5.0422V12.9589C1.20801 14.1256 1.20801 14.7088 1.43508 15.1544C1.63481 15.5464 1.95329 15.8654 2.3453 16.0651C2.79051 16.292 3.37362 16.292 4.53812 16.292H12.4612C13.6257 16.292 14.208 16.292 14.6532 16.0651C15.0452 15.8654 15.3648 15.5461 15.5645 15.1541C15.7913 14.7089 15.7913 14.1264 15.7913 12.9619V11.0837M16.833 5.87533V0.666992M16.833 0.666992H11.6247M16.833 0.666992L9.54134 7.95866"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default InternalLinkIcon;
